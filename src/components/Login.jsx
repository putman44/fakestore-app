import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/Alert";

const Login = ({ user, setUser, setIsloggedIn, isLoggedIn }) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        user
      );
      // The API returns { token: "..." } on success
      setUser({ ...user, token: response.data.token });
      setIsloggedIn(true);
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container>
      {isLoggedIn && (
        <Alert
          className="col-6 text-center mx-auto"
          variant="success"
          dismissible
        >
          Logged in successfully!
        </Alert>
      )}

      {!isLoggedIn && (
        <Form onSubmit={handleSubmit} className="col-6 mx-auto">
          {error && (
            <Alert className="text-center" variant="danger" dismissible>
              {error}
            </Alert>
          )}
          <Row className="">
            <Col>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter your user name"
                  name="username"
                  required
                  value={user.username}
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
                  value={user.password}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your password
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="">
            <Col>
              <Button variant="primary" type="submit" className="col-4">
                Login
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button
                as={NavLink}
                to="/CreateUser"
                variant="primary"
                className="col-6 text-center"
              >
                Create New User
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Container>
  );
};

export default Login;
