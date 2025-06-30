import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/FakeStoreAPI";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import styles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const categories = products.reduce((acc, product) => {
    if (!acc.some((cat) => cat.name === product.category)) {
      acc.push({ id: acc.length, name: product.category });
    }
    return acc;
  }, []);

  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const handleSelectCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : productsByCategory[selectedCategory] || [];

  if (loading)
    return (
      <div
        style={{ height: "700px" }}
        className="d-flex justify-content-center align-items-center "
      >
        <h1 className="font">Loading products...</h1>
      </div>
    );
  if (error)
    return (
      <div
        style={{ height: "700px" }}
        className="d-flex justify-content-center align-items-center "
      >
        <h1 className="font">{error}</h1>
      </div>
    );

  return (
    <Container className="mx-auto">
      <Row className="">
        <div className="mb-2">
          <label className="me-2" htmlFor="filter">
            Filter by Category:{" "}
          </label>
          <select onChange={handleSelectCategory} name="filter" id="filter">
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </Row>
      <Row className="g-3">
        {filteredProducts.map((item) => (
          <Col key={item.id} className="col-3">
            <Card>
              <Card.Img className={styles.img} variant="top" src={item.image} />
              <Card.Body>
                <Card.Title className={styles.title}>{item.title}</Card.Title>
                <Card.Text className={styles.description}>
                  {item.description}
                </Card.Text>
                <Card.Text>${item.price}</Card.Text>
                <Button variant="primary">Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
