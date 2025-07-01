import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useProducts } from "../contexts/ProductContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, loading } = useProducts(); // 👈 useContext instead of fetching
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const product = products.find((p) => p.id === parseInt(productId));
    if (product) {
      setForm({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      });
    } else if (!loading) {
      setError("Product not found.");
    }
  }, [productId, products, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await axios.put(`https://fakestoreapi.com/products/${productId}`, {
        ...form,
        price: parseFloat(form.price),
      });
      setSuccess("Product updated successfully!");
    } catch {
      setError("Failed to update product.");
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate(`/products/${productId}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, productId]);

  if (loading)
    return (
      <div
        style={{ height: "700px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <h1>Loading products...</h1>
      </div>
    );

  return (
    <Container className="mt-4">
      <h2>Edit Product</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
