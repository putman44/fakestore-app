import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../utils/FakeStoreAPI";

const DeleteModal = ({ message, productId, showModal, handleCloseModal }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteProduct(productId);
    navigate("/products");
  };

  let content;

  if (message === "Are you sure you want to delete this product?") {
    content = (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{message}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-evenly">
          <Button className="w-25 btn btn-success" onClick={handleDelete}>
            Yes
          </Button>
          <Button
            className="w-25 btn btn-danger"
            variant="primary"
            onClick={handleCloseModal}
          >
            No
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
  if (message === "Product added to cart") {
    content = (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{message}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Button className="w-25 btn btn-success" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
  return <>{content}</>;
};

export default DeleteModal;
