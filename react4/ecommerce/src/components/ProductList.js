import React from 'react';
import '../style/ProductList.css'; // Import the CSS file for ProductList styles

const ProductList = ({ products }) => {
  return (
    <div className="product-list-container">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <div className="product-icons">
                <span className="product-icon">
                  <i className="fa fa-edit"></i>
                </span>
                <span className="product-icon">
                  <i className="fa fa-shopping-cart"></i>
                </span>
                <span className="product-icon">
                  <i className="fa fa-trash"></i>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
