import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
