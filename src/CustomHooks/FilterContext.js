import React, { createContext, useContext, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
// Create a context
const ProductFilterContext = createContext();

// Create a provider component
export const ProductFilterProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const handleBrandChange = (value) => {

    setBrandFilter(value);
    if(brandFilter){
      const urlSearchParams = new URLSearchParams(location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      params.brand = value; 
      const updatedUrl = `${location.pathname}?${new URLSearchParams(params)}`;
      navigate(updatedUrl);
    }
  };

  const handlePriceChange = (value) => {
    setPriceFilter(value);
  };


  const state = {
    brandFilter,
    priceFilter,
    handleBrandChange,
    handlePriceChange,
  };

  return (
    <ProductFilterContext.Provider value={state}>
      {children}
    </ProductFilterContext.Provider>
  );
};

// Create a custom hook to use the context
export const useProductFilter = () => {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error("useProductFilter must be used within a ProductFilterProvider");
  }
  return context;
};
