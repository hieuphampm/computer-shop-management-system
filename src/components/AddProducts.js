import React, { useState } from 'react';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      category: productCategory,
      price: productPrice,
      description: productDescription,
    };
    console.log('Product added:', newProduct);

    setProductName('');
    setProductCategory('');
    setProductPrice('');
    setProductDescription('');
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
