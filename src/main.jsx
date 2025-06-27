import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // This imports/applies Bootstrap to the whole project

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
