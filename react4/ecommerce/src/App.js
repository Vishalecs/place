import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Nav from './components/Nav';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/vishalecs/data/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAddProduct = (newProduct) => {
    // Generate a unique ID for the new product (you can use a library like `uuid` for this in real projects)
    newProduct.id = Date.now();
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Router>
      <div>
        <Nav />
        <h1>E-Commerce App</h1>
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/add" element={<ProductForm onAddProduct={handleAddProduct} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
