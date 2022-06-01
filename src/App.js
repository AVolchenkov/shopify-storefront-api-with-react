import './App.css';
import { useQuery, gql } from "@apollo/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import IndexPage from "./pages/IndexPage"
import ProductPageById from "./pages/ProductPageById"
import ProductPageByHandle from "./pages/ProductPageByHandle"

// const FILMS_QUERY = gql`
//   {
//     products(first: 250) {
//       edges {
//         node {
//           handle
//           id
//           title
//           descriptionHtml
//           images(first: 250) {
//             edges {
//               node {
//                 src
//                 id
//                 altText
//               }
//             }
//           }
//           variants(first: 250) {
//             edges {
//               node {
//                 id
//                 priceV2 {
//                   amount
//                   currencyCode
//                 }
//                 compareAtPriceV2 {
//                   amount
//                   currencyCode
//                 }
//                 selectedOptions {
//                   name
//                   value
//                 }
//                 title
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;


function App() {
  // const { data, loading, error } = useQuery(FILMS_QUERY);

  // if (loading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>
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
