
import Home from '../../pages/home/Home'
import Product from '../../pages/Products/Product';
import ProductDetail from '../../pages/ProductDetail/ProductDetail';


export const privateRoutes = [
    { key: "/", path: "/", element: <Home /> },
    { key: "product", path: "/product", element: <Product /> },
    { key: "product-detail", path: "/product/:id", element: <ProductDetail /> },


];