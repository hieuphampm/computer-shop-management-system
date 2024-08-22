import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"; 
import { storage, db } from '../../config/Config';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'; 

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [category, setCategory] = useState('laptop');
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg'];

    const fetchProducts = async () => {
        const productsCollection = collection(db, 'Products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        } else {
            setProductImg(null);
            setError('Select an image type png or jpeg');
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();

        if (!productImg) {
            setError("Please select an image first!");
            return;
        }

        const storageRef = ref(storage, `${category}/${productImg.name}`);
        const uploadTask = uploadBytesResumable(storageRef, productImg);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            }, 
            (error) => {
                setError(error.message);
            }, 
            async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    await addDoc(collection(db, 'Products'), {
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url,
                        Category: category 
                    });
                    setProductName('');
                    setProductPrice(0);
                    setProductImg(null);
                    setCategory('laptop'); 
                    setError('');
                    document.getElementById('file').value = '';
                    fetchProducts(); 
                } catch (error) {
                    setError(error.message);
                }
            }
        );
    };

    const deleteProduct = async (product) => {
        try {
            const productRef = doc(db, 'Products', product.id);
            await deleteDoc(productRef);
            const storageRef = ref(storage, product.Category + "/" + product.ProductImg.split('/').pop());
            await deleteObject(storageRef);
            setError('');
            fetchProducts();
        } catch (error) {
            setError(error.message);
        }
    };

    const filteredProducts = products.filter(product => 
        product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container'>
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <br />
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <br />
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />
                <label htmlFor="category">Category</label>
                <br />
                <select className='form-control' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="laptop">Laptop</option>
                    <option value="pc">PC</option>
                    <option value="hardware">Hardware</option>
                    <option value="tablet">Tablet</option>
                </select>
                <br />
                <label htmlFor='product-img'>Product Image</label>
                <br />
                <input type="file" className='form-control' onChange={productImgHandler} id='file' />
                <br />
                <button className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span>{error}</span>}
            
            <br />
            <h2>Manage Products</h2>
            <hr />
            <div className='search-container'>
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="form-control"
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    value={searchTerm} 
                />
            </div>
            <hr />
            {searchTerm && (
                <div className='products-container'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div key={product.id} className='product-card'>
                                <div className='product-img'>
                                    <img src={product.ProductImg} alt={product.ProductName} />
                                </div>
                                <div className='product-name'>{product.ProductName}</div>
                                <div className='product-price'>
                                    {product.ProductPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </div>
                                <div className='btn-container'>
                                    <button 
                                        className='addcart-btn' 
                                        onClick={() => deleteProduct(product)}
                                        style={{ backgroundColor: '#dc3545', borderRadius: '0 0 10px 10px' }}>
                                        Delete Product
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
