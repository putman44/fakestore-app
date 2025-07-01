import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const CreateUser = () => {
  const { setUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      // Create the user
      const response = await axios.post(
        "https://fakestoreapi.com/users",
        formData
      );

      // Then immediately log them in to get a token
      const loginResponse = await axios.post(
        "https://fakestoreapi.com/auth/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      // Update user context with user info + token
      setUser({ ...formData, token: loginResponse.data.token });

      setIsLoggedIn(true);

      navigate("/products");
    } catch (error) {
      console.error("User creation or login failed:", error.message);
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="col-6 mx-auto mt-4"
    >
      <Row>
        <Col>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <FloatingLabel
            controlId="formPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>

      <Button variant="primary" type="submit" className="mt-2 w-100">
        Create Account
      </Button>
    </Form>
  );
};

export default CreateUser;
