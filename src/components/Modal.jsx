import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../utils/FakeStoreAPI";

const ConfirmationModal = ({
  message,
  productId,
  showModal,
  handleCloseModal,
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      navigate("/products");
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const isDeleteConfirm =
    message === "Are you sure you want to delete this product?";
  const isAddToCart = message === "Product added to cart";

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-evenly">
        {isDeleteConfirm && (
          <>
            <Button className="w-25 btn btn-success" onClick={handleDelete}>
              Yes
            </Button>
            <Button className="w-25 btn btn-danger" onClick={handleCloseModal}>
              No
            </Button>
          </>
        )}

        {isAddToCart && (
          <Button className="w-25 btn btn-success" onClick={handleCloseModal}>
            Close
          </Button>
        )}

        {!isDeleteConfirm && !isAddToCart && (
          <Button className="w-25 btn btn-secondary" onClick={handleCloseModal}>
            Close
          </Button>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
