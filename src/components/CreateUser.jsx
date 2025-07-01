import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/users",
        formData
      );

      setUser({ ...formData, ...response.data });
    } catch (error) {
      console.log(error.message);
    }
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit} className="col-6 mx-auto">
      <Row className="">
        <Col>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter your user name"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide an email
          </Form.Control.Feedback>
          <FloatingLabel
            controlId="floatingPhone"
            label="password"
            className="mb-3"
            style={{ marginTop: "12px" }}
          >
            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateUser;
