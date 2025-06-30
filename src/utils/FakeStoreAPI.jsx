import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.log("Error fetching products:", error.message);
    throw error; // <-- throw the error so the component can catch it
  }
};
