import React, { useState, useEffect } from 'react';
import { useProductFilter } from '../CustomHooks/FilterContext';

const ProductList = ({ data ,averagePrice}) => {
    const { brandFilter, 
        priceFilter, 
        handleBrandChange, 
        handlePriceChange, 
         } = useProductFilter();       

  return (
    <div>
      <form className='mx-5'>
        <select onChange={(e)=>handleBrandChange(e.target.value)} value={brandFilter} className='p-1'>
          <option value="">All Brands</option>
          {[...new Set(data.map(product => product.brand))].map((brand, index) => (
            <option key={index} value={brand}>{brand}</option>
          ))}
        </select>

        <select name="priceFilter" id="priceFilter" className='mx-3 p-1' 
        onChange={(e)=>handlePriceChange(e.target.value)} value={priceFilter}>
            <option value="">All Prices</option>
            <option value={`>${averagePrice}`}>{`above Rs.${averagePrice}`}</option>
            <option value={`<${averagePrice}`}>{`below Rs.${averagePrice}`}</option>
        </select>
        </form>
    </div>
  );
};

export default ProductList;
