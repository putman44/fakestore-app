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

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <h1 className="font">Loading products...</h1>
      </div>
    );
  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <h1 className="font">{error}</h1>
      </div>
    );

  return (
    <Container className="mx-auto">
      <Row className="g-3">
        {products.map((item) => (
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
