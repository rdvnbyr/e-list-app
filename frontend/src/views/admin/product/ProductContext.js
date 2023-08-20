import {createContext, useContext, useState} from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export function ProductProvider({children, ctxEvents}) {
  const [product, setProduct] = useState(null);
  const value = {product, setProduct, ...ctxEvents};
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
