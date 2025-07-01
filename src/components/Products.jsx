import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Products.module.css";
import { useProducts } from "../contexts/ProductContext";

const Products = () => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "700px" }}
      >
        <h1>Loading products...</h1>
      </div>
    );

  if (error)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "700px" }}
      >
        <h1>{error}</h1>
      </div>
    );

  return (
    <Container className="mx-auto">
      <Row>
        <div className="mb-2">
          <label htmlFor="filter" className="me-2">
            Filter by Category:
          </label>
          <select
            id="filter"
            name="filter"
            onChange={handleSelectCategory}
            value={selectedCategory}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </Row>
      <Row className="g-3">
        {filteredProducts.map((item) => (
          <Col key={item.id} xs={6} sm={6} md={4} lg={3}>
            <Card>
              <Card.Img className={styles.img} variant="top" src={item.image} />
              <Card.Body>
                <Card.Title className={styles.title}>{item.title}</Card.Title>
                <Card.Text className={styles.description}>
                  {item.description}
                </Card.Text>
                <Card.Text>Price: ${item.price}</Card.Text>
                <Link to={`${item.id}`} className="btn btn-primary">
                  Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
