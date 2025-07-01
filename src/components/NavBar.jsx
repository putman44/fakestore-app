import { useNavigate, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { setUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg="info" variant="dark" expand="lg" className="p-3 mb-4">
      <Navbar.Brand as={NavLink} to="/">
        FakeStore
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link
            as={NavLink}
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Products
          </Nav.Link>
          {isLoggedIn && (
            <Nav.Link
              as={NavLink}
              to="/add-product"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Add Product
            </Nav.Link>
          )}
          {isLoggedIn ? (
            <Nav.Link
              onClick={() => {
                setIsLoggedIn(false);
                setUser({ id: "", username: "", email: "", password: "" });
                navigate("/");
              }}
              as={NavLink}
              to="/"
            >
              Log Out
            </Nav.Link>
          ) : (
            <Nav.Link
              as={NavLink}
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
