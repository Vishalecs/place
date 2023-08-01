import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '', // Add an imageUrl property to store the image URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({
      name: '',
      price: '',
      description: '',
      imageUrl: '', // Clear the imageUrl field after submission
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={product.name} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="text" name="price" value={product.price} onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={product.description} onChange={handleChange} />
      </label>
      <label>
        Image URL: {/* Change the input type to "text" */}
        <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
