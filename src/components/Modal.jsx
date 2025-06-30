import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../utils/FakeStoreAPI";

const FormModal = ({ productId, showModal, handleCloseModal }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteProduct(productId);
    navigate("/products");
  };
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete this product?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-evenly">
          <Button className="w-25 btn btn-success" onClick={handleDelete}>
            Yes
          </Button>{" "}
          <Button
            className="w-25 btn btn-danger"
            variant="primary"
            onClick={handleCloseModal}
          >
            No
          </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default FormModal;
