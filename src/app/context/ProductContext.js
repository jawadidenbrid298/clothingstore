'use client';
import React, {createContext, useContext, useState} from 'react';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({children}) => {
  const [product, setProduct] = useState(null);

  return <ProductContext.Provider value={{product, setProduct}}>{children}</ProductContext.Provider>;
};
