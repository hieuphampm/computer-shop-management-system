import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const firestore = getFirestore();
        const productsCollection = collection(firestore, 'Products');

        const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
            const productsArray = [];
            snapshot.forEach((doc) => {
                productsArray.push({
                    ProductID: doc.id,
                    ProductName: doc.data().ProductName,
                    ProductPrice: doc.data().ProductPrice,
                    ProductImg: doc.data().ProductImg,
                    Category: doc.data().Category,
                    Description: doc.data().ProductDescription
                });
            });
            setProducts(productsArray);
        });

        return () => unsubscribe();
    }, []);

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    );
};
