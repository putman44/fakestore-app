import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const [error, setError] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/products" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        user
      );
      setUser({ ...user, token: response.data.token });
      setIsLoggedIn(true);
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <Container>
      {error && (
        <Alert
          className="text-center col-6 mx-auto"
          variant="danger"
          dismissible
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} className="col-6 mx-auto">
        <Row>
          <Col>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your user name"
                name="username"
                required
                value={user?.username || ""}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                required
                value={user?.password || ""}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" type="submit" className="col-4">
              Log in
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button
              as={NavLink}
              to="/createuser"
              variant="primary"
              className="col-6 text-center"
            >
              Create New User
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
