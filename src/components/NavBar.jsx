import { useNavigate, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  //     <Nav.Link as={NavLink} to="/" />
  // You're telling React Bootstrap:

  // “Hey, instead of rendering a regular <a> tag, render this using the NavLink component from react-router-dom, but still apply Bootstrap styling like a Nav.Link.”

  // It’s like saying:
  // "Style it like a Bootstrap link, but behave like a React Router link."

  const [showModal, setShowModal] = useState(false);

  return (
    <Navbar bg="info" variant="dark" expand="lg" className="p-3 mb-4">
      <Navbar.Brand as={NavLink} to="/">
        FakeStore
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={NavLink} to="/" activeclassname="active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/products" activeclassname="active">
            Products
          </Nav.Link>
          {!user ? (
            // <Nav.Link as={NavLink} to='/login'>Log In</Nav.Link>
            <Nav.Link as={NavLink} to="/CreateUser" activeclassname="active">
              Log In
            </Nav.Link>
          ) : (
            <Nav.Link
              onClick={() => {
                setUser(null);
                navigate("/");
              }}
              as={NavLink}
              to="/"
            >
              Log Out
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
