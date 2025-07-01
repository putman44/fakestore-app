import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./components/Root";
import HomePage from "./components/HomePage";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import { useEffect, useState } from "react";
import { fetchProducts } from "./utils/FakeStoreAPI";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    cart: [],
  });
  const [isLoggedIn, setIsloggedIn] = useState(false);

  // m38rmF$

  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Root
            isLoggedIn={isLoggedIn}
            setIsloggedIn={setIsloggedIn}
            setUser={setUser}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="CreateUser" element={<CreateUser setUser={setUser} />} />
        <Route
          path="login"
          element={
            <Login
              isLoggedIn={isLoggedIn}
              setIsloggedIn={setIsloggedIn}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="products"
          element={
            <Products products={products} loading={loading} error={error} />
          }
        />
        <Route
          path="products/:productId"
          element={
            <ProductDetail
              isLoggedIn={isLoggedIn}
              setUser={setUser}
              loading={loading}
              error={error}
              products={products}
            />
          }
        />
        <Route
          path="products/:productId/edit-product"
          element={
            <EditProduct
              isLoggedIn={isLoggedIn}
              setUser={setUser}
              loading={loading}
              error={error}
              products={products}
            />
          }
        />
        <Route path="add-product" element={<AddProduct />} />
      </Route>
    )
  );

  return <RouterProvider router={appRouter} />;
}

export default App;
