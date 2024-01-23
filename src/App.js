import React, { lazy, Suspense ,useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ProductFilterProvider} from './CustomHooks/FilterContext'
import Navbar from './components/Navbar';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const Products = lazy(() => import('./pages/Products'));
const SearchResults = lazy(() => import('./pages/SearchResults'));

function App() {
  const [averagePrice, setAveragePrice] = useState(0);
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/categories/:categoryId"
          element={
            <ProductFilterProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Category averagePrice={averagePrice} setAveragePrice={setAveragePrice}/>
            </Suspense>
            </ProductFilterProvider>
          }
        />
        <Route
          path="/allProducts"
          element={
          <ProductFilterProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Products averagePrice={averagePrice} setAveragePrice={setAveragePrice}/>
            </Suspense>
          </ProductFilterProvider>
          }
        />
        <Route
          path="/searchResults"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SearchResults />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
