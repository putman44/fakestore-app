import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h1>Products</h1>
          <p>
            Hello, welcome to Products where you can find anything you ever
            wanted!
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button as={NavLink} to="/products" variant="primary">
            Products
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
