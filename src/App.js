import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import IndexPage from "./pages/IndexPage"
import ProductPageById from "./pages/ProductPageById"
import ProductPageByHandle from "./pages/ProductPageByHandle"


function App() {
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
