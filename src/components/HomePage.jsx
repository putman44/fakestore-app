import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <Container
      style={{ height: "700px" }} // or any value you want
      className="d-flex flex-column justify-content-center
      align-items-center text-center"
    >
      <Row>
        <Col>
          <h1>FakeStore</h1>
          <p>
            Hello, welcome to FakeStore where you can find all the fake items
            you crave!
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
