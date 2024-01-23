import { useEffect, useState } from 'react';
import CategoryComponent from '../components/CategoryComponent';
import DropDown from '../components/DropDownMenu';

function Products({averagePrice,setAveragePrice}){
    const [products,setProducts] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    const aTagStyles ={
        textDecoration: 'none',
        color: 'black'
      }
      useEffect(() => {
        async function getCategoryProducts() {
          try {
            setIsLoading(true);
    
            // Check if the data is cached
            const cache = await caches.open('productsData');
            const cachedResponse = await cache.match(`${process.env.REACT_APP_VALUE}/allProducts`);
    
            if (cachedResponse) {
              const data = await cachedResponse.json();
              const sum = data.reduce((total, item) => total + item.discounted_price, 0);
              setAveragePrice(Math.floor(sum / data.length));
    
              setProducts(data);
              setIsLoading(false);
            } else {
              // If not cached, fetch and cache the data
              const response = await fetch(`${process.env.REACT_APP_VALUE}/allProducts`);
    
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
    
              // Clone the response before using it
              await cache.put(`${process.env.REACT_APP_VALUE}/allProducts`, response.clone());
    
              const data = await response.json();
              const sum = data.reduce((total, item) => total + item.discounted_price, 0);
              setAveragePrice(Math.floor(sum / data.length));
    
              setProducts(data);
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        getCategoryProducts();
      }, []);
    return (
        <div>
            
        <div className='flex flex-column mb-5'> 
            <h1 className='text-red text-center'>All Products</h1>
            <DropDown/>
        </div>
            <CategoryComponent data={products} averagePrice={averagePrice}/>
        </div>
    )
}

export default Products;