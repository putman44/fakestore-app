import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useState, useMemo } from "react";
import Modal from "./Modal";
import { useProducts } from "../contexts/ProductContext";
import { useAuth } from "../contexts/AuthContext";

const ProductDetail = () => {
  const { setUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const { productId } = useParams();

  const product = products?.find((p) => p.id === Number(productId));

  const handleCloseModal = () => setShowModal(false);
  const handleModal = (message) => {
    setMessage(message);
    setShowModal(true);
  };

  const stars = useMemo(() => {
    if (!product?.rating?.rate) return [];
    const rating = Math.round(product.rating.rate);
    return Array.from({ length: 5 }, (_, i) => (i < rating ? "★" : "☆"));
  }, [product]);

  const handleAddToCart = () => {
    handleModal("Product added to cart");
    setUser((prevUser) => {
      if (!prevUser || !prevUser.cart) return prevUser;

      const existing = prevUser.cart.find((item) => item.id === product.id);
      const updatedCart = existing
        ? prevUser.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...prevUser.cart,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity: 1,
            },
          ];

      return { ...prevUser, cart: updatedCart };
    });
  };

  // --- Render States ---
  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "700px" }}
      >
        <h1>Loading products...</h1>
      </div>
    );

  if (error)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "700px" }}
      >
        <h1>{error}</h1>
      </div>
    );

  if (!product)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "700px" }}
      >
        <h1>Product not found.</h1>
      </div>
    );

  return (
    <Row className="p-2 m-2">
      <Col xs={6} md={4} className="mx-auto mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-100 p-3 border-2 rounded"
        />
      </Col>

      <Col xs={12} md={8} className="p-2">
        <h2>{product.title}</h2>
        <h4>Price: ${product.price}</h4>

        <div>
          <span style={{ fontSize: "1.5rem", color: "#FFD700" }}>
            {stars.join("")}
          </span>
          <span className="fs-4">({product.rating?.count ?? 0})</span>
        </div>

        <p>{product.description}</p>

        <Modal
          message={message}
          productId={productId}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />

        <Row className="w-100 d-flex justify-content-between mx-auto mt-3">
          <div className="col-4 d-flex gap-2 p-0">
            <Button
              variant="danger"
              onClick={() =>
                handleModal("Are you sure you want to delete this product?")
              }
              disabled={!isLoggedIn}
            >
              Delete
            </Button>
            {isLoggedIn ? (
              <Button
                className="align-content-center"
                as={NavLink}
                to="edit-product"
              >
                Edit
              </Button>
            ) : (
              <Button
                className="align-content-center"
                variant="secondary"
                disabled
              >
                Edit
              </Button>
            )}
          </div>
          <Button
            className="col-3"
            onClick={() => {
              if (!isLoggedIn) {
                navigate("/login");
              } else {
                handleAddToCart();
              }
            }}
          >
            {!isLoggedIn ? "Log in" : "Add To Cart"}
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;
