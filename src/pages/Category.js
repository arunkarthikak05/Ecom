import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { useProductFilter } from '../CustomHooks/FilterContext';
import CategoryComponent from '../components/CategoryComponent';
import '../index.css'


function Category({averagePrice,setAveragePrice}){

    const {brandFilter,priceFilter} = useProductFilter();
    const [error,setError] = useState("")
    const {categoryId} = useParams();
    const [products,setProducts] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    async function fetchData() {
        try {
          setIsLoading(true);
    
          let url = `${process.env.REACT_APP_VALUE}/category/${categoryId}`;

          // Add brandFilter to the URL if available
          if (brandFilter) {
            const brandFilterParam = encodeURIComponent(brandFilter);
            url += `?brand=${brandFilterParam}`;
          }
  
          // Add priceFilter to the URL if available
          if (priceFilter) {
            const priceFilterParam = encodeURIComponent(priceFilter);
            url += brandFilter ? `&price=${priceFilterParam}` : `?price=${priceFilterParam}`;
          }
  
          const res = await fetch(url);
         
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await res.json();
          
          if ((!priceFilter && !brandFilter) || (averagePrice===0 && data.length>0)) {
            const sum = data.reduce((total, item) => total + item.discounted_price, 0);
            setAveragePrice(Math.floor(sum / data.length));
          }
          
          setProducts(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
          setError(error.message);
          setTimeout(() => {
            setError(''); 
          }, 10000);
        } finally {
          setIsLoading(false);
        }
      }
    

      useEffect(() => {
        fetchData();
      }, [categoryId, brandFilter,priceFilter]);      

    return(
        <div>    
          {error 
          ? <div className='ml-[30%] alert alert-danger max-w-fit'>
            {error}..
            <span>Too many requests sent</span>
          </div> 
          :
          (isLoading ? 
            <div>
                <h1>Loading...</h1>
            </div>
            :(
            <>
              <h1 className='text-red text-center'>{products && products.length > 0 ? `Checkout our ${products[0].category_name} collections` : 'Loading..'} </h1>
              <CategoryComponent data={products} averagePrice={averagePrice}/>
            </>
            ))
            }
        </div>
    );
}

export default Category;