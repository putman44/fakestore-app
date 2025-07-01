import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import Modal from "./Modal";

const ProductDetail = ({ products, loading, error, setUser, isLoggedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseModal = () => setShowModal(false);

  const { productId } = useParams();

  const product = products.find((product) => product.id === Number(productId));

  if (loading)
    return (
      <div
        style={{ height: "700px" }}
        className="d-flex justify-content-center align-items-center "
      >
        <h1>Loading products...</h1>
      </div>
    );
  if (!product) {
    return (
      <div
        style={{ height: "700px" }}
        className="d-flex justify-content-center align-items-center "
      >
        <h1>Product not found..</h1>
      </div>
    );
  }
  if (error)
    return (
      <div
        style={{ height: "700px" }}
        className="d-flex justify-content-center align-items-center "
      >
        <h1>{error}</h1>
      </div>
    );

  const stars = [];
  const rating = Math.round(product.rating.rate);
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? "★" : "☆");
  }

  const handleModal = (message) => {
    setMessage(message);
    setShowModal(true);
  };

  return (
    <Row className="p-2 m-2">
      <Col className="mx-auto mb-3" xs={6} md={4}>
        <img
          className="w-100 p-3 border border-2 rounded"
          src={product.image}
          alt={product.title}
        />
      </Col>
      <Col className="p-2" xs={12} md={8}>
        <h2>{product.title}</h2>
        <h4>Price: ${product.price}</h4>
        <div>
          <span style={{ fontSize: "1.5rem", color: "#FFD700" }}>
            {stars.join("")}
          </span>
          <span className="fs-4">({product.rating.count})</span>
        </div>
        <p>{product.description}</p>
        <Modal
          message={message}
          productId={productId}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
        <Row className="w-100 d-flex justify-content-between p-0 mx-auto">
          <div className="col-4 d-flex justify-content-start gap-1 p-0">
            <Button
              className=" btn btn-danger text-center p-1"
              onClick={() =>
                handleModal("Are you sure you want to delete this product?")
              }
            >
              Delete
            </Button>
            <Button as={NavLink} to="edit-product">
              Edit
            </Button>
          </div>

          <Button
            disabled={!isLoggedIn}
            className="col-4"
            onClick={() => {
              handleModal("Product added to cart");
              setUser((prevUser) => {
                const existing = prevUser.cart.find(
                  (item) => item.id === product.id
                );
                let newCart;
                if (existing) {
                  newCart = prevUser.cart.map((item) =>
                    item.id === product.id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  );
                } else {
                  newCart = [
                    ...prevUser.cart,
                    {
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    },
                  ];
                }
                return { ...prevUser, cart: newCart };
              });
            }}
          >
            {!isLoggedIn ? "Please login" : "Add To Cart"}
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;
