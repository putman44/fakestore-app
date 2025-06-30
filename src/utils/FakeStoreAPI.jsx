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

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${productId}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
