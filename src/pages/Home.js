import React, { useEffect, useState, useCallback } from 'react';
import TableComponent from '../components/TableComponent';


const Home = () => {
  const [categories, setCategories] = useState([]);
  const [error,setError] = useState("");
  console.log(`value:${process.env.REACT_APP_VALUE}`)

  const getData =async function getData() {
    try {
      const cache = await caches.open('categoriesData');

      const cachedResponse = await cache.match(`${process.env.REACT_APP_VALUE}/api`);
  
      if (cachedResponse) {
        const data = await cachedResponse.json();
        setCategories(data);
      } 
      else {
        const response = await fetch(`${process.env.REACT_APP_VALUE}/api`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        await cache.put(`${process.env.REACT_APP_VALUE}/api`, response.clone());
  
        const data = await response.json();
        setCategories(data);
       }
   } 
    catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    
    getData();
  
  }, []);



  return (
    <div>
      {error ?  <div className='ml-[30%] alert alert-danger max-w-fit'>
            {error}..
            <span>Too many requests sent</span>
          </div> :   
          <TableComponent data={categories}/>
          }    
    </div>
  );
};

export default Home;

  // const getData = useCallback(async () => {
  //   console.log("in")
  //   try {
  //     const response = await fetch("http://localhost:30/api");
  
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  
  //     const data = await response.json();
  //     setCategories(data);
  //     setDataFetched(true);
  //     localStorage.setItem('dataFetched', 'true');
  //     localStorage.setItem('data',JSON.stringify(data));
  //   } catch (error) {
  //     setError(error.message);
  //     console.error('Error fetching data:', error);
  //   }
  // }, []);
    
  // useEffect(() => {
  //   if(!dataFetched) {
  //   getData();
  //   }
  // }, [getData]); 