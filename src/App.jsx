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
import UserModal from "./components/CreateUser";
import CreateUser from "./components/CreateUser";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

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
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="CreateUser" element={<CreateUser setUser={setUser} />} />
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
              loading={loading}
              error={error}
              products={products}
            />
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={appRouter} />;
}

export default App;
