import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.log("Error fetching products:", error.message);
    throw error; // Throw so caller can handle
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `https://fakestoreapi.com/products/${productId}`
    );
    console.log("Deleted product:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error; // Throw to notify caller
  }
};
