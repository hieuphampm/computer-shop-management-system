import React, { createContext, useReducer } from 'react';
import { CartReducer } from './CartReducer';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    shoppingCart: [],
    totalPrice: 0,
    totalQty: 0,
  });

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
