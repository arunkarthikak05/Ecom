import React,{useEffect, useState} from 'react'
import {  useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Searchbar() {
    const navigate  = useNavigate()
    const [query,setQuery] = useState("")
    
    const  handleSubmit=(e) =>{
        e.preventDefault();
        if(query){
            navigate(`/searchResults?q=${encodeURIComponent(query)}`);
            setQuery("");
        }
        console.log(query)
    }

    const handleRefresh = async () => {
      if(query)
          navigate(`/searchResults?q=${encodeURIComponent(query)}`);
    }

    useEffect(()=>{
      handleRefresh();
    },[setQuery])
  return (
    <>
       <form action="post" onSubmit={handleSubmit}>
        <input type="text" placeholder='Search for products, brand, price and more'className='ml-10 w-[300px] bg-gray-100 outline-none rounded-1 p-2' value={query}
        onChange={(e)=>(setQuery(e.target.value))}
        />
        <button type='submit' className='bg-transparent'>
        <FontAwesomeIcon icon={faSearch} />
        </button>
        
       </form>
    </>
  )
}
