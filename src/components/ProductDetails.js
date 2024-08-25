import React, { useContext } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

export const ProductDetails = () => {
    const { products } = useContext(ProductsContext);
    const { id } = useParams();
    const product = products.find(prod => prod.ProductID === id);

    // Kiểm tra nếu product không tồn tại
    if (!product) {
        return (
            <>
                <Navbar user={null} />
                <div className="product-details-container">
                    <h2>Product Not Found</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar user={null} />
            <div className='product-details-container'>
                <div className='product-image'>
                    <img src={product.ProductImg} alt={product.ProductName} />
                </div>
                <div className='product-info'>
                    <h2 className='product-title'>{product.ProductName}</h2>
                    <p className='product-price'>Price: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.ProductPrice)}</p>
                    <p className='product-category'>Category: {product.Category}</p>
                    <p className='product-description'>Description: {product.Description}</p>
                    <div className='btn-container'>
                        <button className="btn-primary">Add to Cart</button>
                        <button className="btn-secondary">Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
