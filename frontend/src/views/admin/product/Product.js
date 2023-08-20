import {Route, Routes} from 'react-router-dom';
import {ProductEdit} from './product-edit/ProductEdit';
import {ProductProvider} from './ProductContext';
import {ProductPage} from './ProductPage';


export default function Product(props) {
  return (
    <ProductProvider ctxEvents={props}>
      <h1 className=" text-9xl text-red-700 font-extrabold">Product Module</h1>
      <Routes>
        <Route index element={<ProductPage />} />
        <Route path="new" element={<ProductEdit />} />
        <Route path=":id" element={<ProductEdit />} />
      </Routes>
    </ProductProvider>
  );
}
