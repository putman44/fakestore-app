import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import appRouter from "./router"; // We'll define this separately

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={appRouter} />
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
