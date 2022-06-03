import { useParams } from 'react-router'
import { useQuery } from "@apollo/client";
import ProductGallery from '../Components/ProductGallery';
import SelectVariant from '../Components/ProductInfo';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/product-page.css';
import PRODUCT_QUERY_BY_HANDLE from '../query/productByHandle';

const ProductPage = () => {
  let { handle } = useParams();
  const handleForQuery = (handle).toString();

  // Get product by ID
  const { data, loading, error } = useQuery(PRODUCT_QUERY_BY_HANDLE, {
    variables: { handleForQuery }
  });
  if (loading && !data) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  // Get product variants
  let productVariantsSorted;
  if (data.product != null) {
    let productVariants = [];

    data.product.variants.edges.forEach(variant => {
      variant.node.selectedOptions.forEach(option => {
        productVariants.push(option);
      })
    })

    function sortProductVariant(obj, prop) {
      return obj.reduce(function (acc, item) {
        let key = item[prop]
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(item)
        return acc
      }, {})
    }

    const filteredArr = productVariants.reduce((acc, current) => {
      const x = acc.find(item => item.value === current.value);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    productVariantsSorted = sortProductVariant(filteredArr, 'name')
  }

  console.log(data);

  return (
    <div className='product-page'>
      {data.product != null ?
        <>
          <div className='product-container'>
            <div className='product-gallery'>
              <ProductGallery product={data} />
            </div>
            <div className="product-info">
              <h2>
                {data.product.title}
              </h2>
              <div className='product-variant'>
                <SelectVariant product={data} options={productVariantsSorted} />
              </div>
            </div>
          </div>
          {
            data.product.descriptionHtml ?
              <>
                <h3>Product description</h3>
                <div className='product-description' dangerouslySetInnerHTML={{ __html: data.product.descriptionHtml }} />
              </>
              :
              ''
          }
        </>
        :
        <h1 className='product-error-message'>
          Wrong product handle
        </h1>
      }
    </div>
  )
}

export default ProductPage