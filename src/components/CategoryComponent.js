import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Filters from './Filters'
import CardItem from './CardItem';
import Pagination from './Pagination';

function Category({data,averagePrice}){
  const currentUrl = window.location.href;
  const itemsPerPage = 10; 
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  //Get the items for the current page
  const currentItems = data.slice(startIndex, endIndex);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    return (
      <>
      { currentUrl.includes('/allProducts') || currentUrl.includes('/searchResults')? 
      ""
      : <Filters data={data} averagePrice={averagePrice}/>
      }   
      <div>
        <div className='flex flex-row flex-wrap'>
          {currentItems.map((item) => (
               <CardItem item={item} key={item.id}/>
          )
          )}
        </div>
        <div className='m-10 text-black flex flex-row items-center justify-center'>
             {/* Pagination component */}
          <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />

            <div>
            <button
                className='btn btn-primary rounded-full'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={endIndex >= totalItems}
            >
                Next
            </button>
            </div>
        </div>
     </div>
     </>
    )
}

export default Category;