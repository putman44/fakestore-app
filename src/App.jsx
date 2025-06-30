import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./components/Root";
import HomePage from "./components/HomePage";
import Products from "./components/Products";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="products" element={<Products />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
