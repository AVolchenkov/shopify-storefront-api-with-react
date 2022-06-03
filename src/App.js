import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import IndexPage from "./pages/IndexPage"
import ProductPageById from "./pages/ProductPageById"
import ProductPageByHandle from "./pages/ProductPageByHandle"
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import CART_CREATE from './query/cartCreate';

function App() {
  const [GetCart, { data, loading, error }] = useMutation(CART_CREATE);

  useEffect(() => {
    const cartId = JSON.parse(localStorage.getItem('cartId'));
    if (!cartId) {
      GetCart()
      .then((data) => {
        console.log(data);
        if (data != undefined) {
          localStorage.setItem('cartId', JSON.stringify(data.data.cartCreate.cart.id));
        }
      })
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="product" >
          <Route path="id/:id" element={<ProductPageById />} />
          <Route path="handle/:handle" element={<ProductPageByHandle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
