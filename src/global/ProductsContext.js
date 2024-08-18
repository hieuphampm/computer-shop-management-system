import React, { createContext } from 'react';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        const firestore = getFirestore();  
        const productsCollection = collection(firestore, 'Products');  

        onSnapshot(productsCollection, snapshot => {
            const products = [];
            snapshot.forEach(doc => {
                products.push({
                    ProductID: doc.id,
                    ProductName: doc.data().ProductName,
                    ProductPrice: doc.data().ProductPrice,
                    ProductImg: doc.data().ProductImg
                });
            });
            this.setState({ products });
        });
    }

    render() {
        return (
            <ProductsContext.Provider value={{ products: this.state.products }}>
                {this.props.children}
            </ProductsContext.Provider>
        );
    }
}
