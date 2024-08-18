import React,{useContext} from 'react'
import { ProductsContext } from '../global/ProductsContext'


export const Products = () => {

    const {products} = useContext(ProductsContext);
    console.log(products);

    return (
        <>
            {products.length !== 0 && <h1>Products</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.ProductPrice)}
                        </div>
                        <button className='addcart-btn' >ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Products