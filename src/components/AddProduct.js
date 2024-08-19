import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { storage, db } from '../config/Config';
import { collection, addDoc } from 'firebase/firestore'; 

const AddProduct = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [category, setCategory] = useState('laptop'); // Thêm category
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg'];

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

        // Sử dụng category để xác định folder lưu ảnh
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
                    const docRef = await addDoc(collection(db, 'Products'), {
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url,
                        Category: category // Lưu cả category vào Firestore
                    });
                    console.log("Document written with ID: ", docRef.id);
                    setProductName('');
                    setProductPrice(0);
                    setProductImg(null);
                    setCategory('laptop'); // Reset category về mặc định
                    setError('');
                    document.getElementById('file').value = '';
                } catch (error) {
                    setError(error.message);
                }
            }
        );
    };

    return (
        <div className='container'>
            <br />
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
        </div>
    );
};

export default AddProduct;
