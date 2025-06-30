import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import styles from "./Products.module.css";

const Products = ({ products, loading, error }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        <h1>Loading products...</h1>
      </div>
    );
  if (error)
    return (
      <div
        style={{ height: "700px" }}
        className="d-flex justify-content-center align-items-center "
      >
        <h1>{error}</h1>
      </div>
    );

  return (
    <Container className="mx-auto">
      <Row className="">
        <div className="mb-2">
          <label className="me-2" htmlFor="filter">
            Filter by Category:
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
