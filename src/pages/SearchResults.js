import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router'
import Results from '../components/Results'
import NoProducts from '../components/NoProducts'
import '../index.css'

export default function SearchResults() {
    const [products,setProducts] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    console.log("query"+query)
    console.log(products)

    const handleSearch = async () => {
        try {
            console.log("in")
            setIsLoading(true);
          const response = await fetch(`${process.env.REACT_APP_VALUE}/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setProducts(data);
          console.log('Search Results:', data);
        } catch (error) {
          console.error('Error during search:', error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        handleSearch();
    },[query])
    return(
        <div> 
            <h1 className='title mt-4 text-red text-center'>Search Results</h1>   
          {isLoading ? 
            <div>
                <h1>Loading...</h1>
            </div>
            :(
            products.length > 0?
            <>
                <Results data={products}/>
            </>
            :
            <>
                <NoProducts query={query}/>
            </>
            )
            }
        </div>
    );

}
