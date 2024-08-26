import React, { useContext } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import { Link, useNavigate } from 'react-router-dom';

export const Products = ({ user }) => {
  const { products } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (user) {
      console.log('Product added to cart:', product);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {products.length !== 0 && <h1>Products</h1>}
      <div className='products-container'>
        {products.length === 0 && <div>slow internet...no products to display</div>}
        {products.map(product => (
          <div className='product-card' key={product.ProductID}>
            <div className='product-img'>
              <img src={product.ProductImg} alt={product.ProductName} />
            </div>
            <div className='product-info'>
              <div className='product-name'>{product.ProductName}</div>
              <div className='product-price'>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.ProductPrice)}
              </div>
              <Link to={`/product/${product.ProductID}`} className='details-link'>Details</Link>
              <button className='addcart-btn' onClick={() => handleAddToCart(product)}>ADD TO CART</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
