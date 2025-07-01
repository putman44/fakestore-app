import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./components/Root";
import HomePage from "./components/HomePage";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import NotFound from "./components/NotFound";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="createuser" element={<CreateUser />} />
      <Route path="login" element={<Login />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:productId" element={<ProductDetail />} />
      <Route
        path="products/:productId/edit-product"
        element={<EditProduct />}
      />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default appRouter;
