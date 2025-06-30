import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useParams } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === Number(productId));

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

  const stars = [];
  const rating = Math.round(product.rating.rate);
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? "★" : "☆");
  }

  return (
    <Container>
      <Row>
        <Col className="col-4">
          <img
            className="w-100 p-3 border border-2 rounded"
            src={product.image}
            alt={product.title}
          />
        </Col>
        <Col className="col-8">
          <h2>{product.title}</h2>
          <h4>Price: ${product.price}</h4>
          <div>
            <span style={{ fontSize: "1.5rem", color: "#FFD700" }}>
              {stars.join("")}
            </span>{" "}
            <span className="fs-4">({product.rating.count})</span>
          </div>

          <p>{product.description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
