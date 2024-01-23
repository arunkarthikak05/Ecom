const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const connection = require('./database.js')
const axios = require('axios');

const solr = require('solr-client');

const app = express();
// const requestCounts = {};

const BASE_URL = "http://localhost:8983/solr/newdata"
const PORT = 3008

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let brands;
let productnames;
let notFetched = true;

if(notFetched){
    const query = 'SELECT DISTINCT brand FROM products';
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            brands = results;
            notFetched = false;
        }
     });
    const query1 = 'SELECT DISTINCT product_name FROM products'; 
    connection.query(query1, (error, results, fields) => {
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            productnames = results;
            notFetched = false;
        }
     });
    }

let pricelessThanKeywords = ["below", "less","under"]
let priceGreaterThanKeywords = ["above", "greater"]

app.get('/search', async (req, res) => {
    let query = req.query.q;
   console.log(query);
    let isBelow = pricelessThanKeywords.some(keyword => {
        console.log( query.toLowerCase().includes(keyword) )
        return query.toLowerCase().includes(keyword)
    });
    let isAbove = priceGreaterThanKeywords.some(keyword => query.toLowerCase().includes(keyword));

    console.log("isBelow:", isBelow); 
    console.log("isAbove:", isAbove); 

    let brandsQuery = query.split(" ");
    let productsQuery = query.split(" ");
    let priceQuery = query.split(" ");

    let numbersOnly = priceQuery
      .filter(value => !isNaN(value)) 
      .map(value => parseFloat(value)); 

    console.log("numbers")
    console.log(numbersOnly);    
    
    let brandValues = brandsQuery.filter(query => brands.some(brandObj => brandObj.brand.toLowerCase().includes((query.toLowerCase()))));
    let productValues;

        productValues = productsQuery.filter(queryItem =>
            queryItem!== 'under' && 
            productnames.some(prdObj =>
               prdObj.product_name.toLowerCase().includes(queryItem.toLowerCase())
            )
            );
   
    
    console.log("brands")
    console.log(brandValues);
    console.log("products")
    console.log(productValues);

    try{
        let solrUrl = `${BASE_URL}/select?`;
        //brand query
        if(brandValues.length > 0){
            brandValues.forEach((brandValue,i) => {
                if(i>0){
                    solrUrl += `%20OR%20`;
                    solrUrl += `brand:*${encodeURIComponent(brandValue.slice(1))}*`;
                }
                else{
                if(brandValue.length > 1)
                    solrUrl += `fq=brand:*${encodeURIComponent(brandValue.slice(1))}*`;
                else
                    solrUrl += `fq=brand:${encodeURIComponent(brandValue)}`;
                }
            })
        }
        if(brandValues.length > 0){
            solrUrl += `&`
        }
        //products query
        if(productValues.length > 0){
            productValues.forEach((productValue,i) => {
                if(i>0){
                    solrUrl += `%20OR%20`;
                    solrUrl += `product_name:*${encodeURIComponent(productValue.slice(1))}*`;
                }else{
                if(productValue.length>1)
                    solrUrl += `fq=product_name:*${encodeURIComponent(productValue.slice(1))}*`;
                else    
                solrUrl += `fq=product_name:${encodeURIComponent(productValue)}`
                }
            })
        }
        //Price query
        if(isBelow){
            solrUrl += `&fq=`;
            let Qstr = `discounted_price:[* TO ${numbersOnly[0]}]`
            Qstr = (encodeURIComponent(Qstr))
            solrUrl += Qstr;
        }
        if(isAbove){
            solrUrl += `&fq=`;
            let Qstr = `discounted_price:[${numbersOnly[0]} TO *]`
            Qstr = (encodeURIComponent(Qstr))
            solrUrl += Qstr;
        }
        //Default query
        if(productValues.length>0 || brandValues.length>0) {
            solrUrl += `&q=*%3A*`;
        }
        solrUrl += `&indent=true&wt=json`
        console.log(solrUrl)
       
        //Data fetching
        const response = await fetch(solrUrl);
        if (response.ok) {
            let jsonResponse = await response.json();
            jsonResponse = jsonResponse.response.docs;
            console.log(jsonResponse);
            res.json(jsonResponse);
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            res.status(response.status).send('Error fetching data from Solr');
        }
    }catch(err){
        console.log(err);
    }
    
});
  

app.get('/api',(req,res) => {
    //console.log("IN")
    const query = 'SELECT * FROM new_table';
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            data = results;
           res.json(results);
        }
    });
})


app.get('/category/:categoryId',(req,res)=>{
    console.log("in")
    const startTime = performance.now();
    const categoryId = req.params.categoryId;
    const brandFilter = req.query.brand; 
    const priceFilter = req.query.price; 

    let query = `SELECT * FROM products WHERE category_id = ${categoryId}`;
    if (brandFilter) {
        query += ` AND brand = '${brandFilter}'`;
    }
    if (priceFilter) {
        // Assuming your price column is numeric in the database
        query += ` AND discounted_price ${priceFilter.startsWith('<') ? '<=' : '>'} ${parseFloat(priceFilter.substr(1))}`;
    }
    connection.query(query, (error, results, fields) => {
        const endTime = performance.now();
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            const timeTaken = endTime - startTime;
            console.log(`query: ${query}`)
            console.log(`query executed successfully in ${timeTaken} milliseconds`);
            data = results;
           res.json(results);
        }
    });
})

app.get('/allProducts',(req,res)=>{
    //console.log("in")
    const query = 'SELECT * FROM products';
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            data = results;
           res.json(results);
        }
    });
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})
