import React, { useContext } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import { useParams } from 'react-router-dom';

export const ProductDetails = () => {
    const { products } = useContext(ProductsContext);
    const { id } = useParams();
    const product = products.find(prod => prod.ProductID === id);

    return (
        <div className='product-details'>
            <h2>{product.ProductName}</h2>
            <img src={product.ProductImg} alt={product.ProductName} />
            <p>Price: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.ProductPrice)}</p>
            <p>Category: {product.Category}</p>
        </div>
    );
};

export default ProductDetails;
