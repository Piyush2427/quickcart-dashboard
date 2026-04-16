import React from 'react';
import { Modal, Button, Badge, Row, Col } from 'react-bootstrap';
import { FaStar, FaCartPlus } from 'react-icons/fa';

const ProductDetailsModal = ({ show, onHide, product, addToCart }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
      </Modal.Header>
      <Modal.Body className="pt-0">
        <Row>
          <Col md={5} className="d-flex justify-content-center align-items-center p-4">
            <img 
              src={product.image} 
              alt={product.title} 
              className="img-fluid" 
              style={{ maxHeight: '300px' }} 
            />
          </Col>
          <Col md={7} className="d-flex flex-column justify-content-center pe-4">
            <Badge bg="secondary" className="mb-2 align-self-start">
              {product.category}
            </Badge>
            <h4 className="fw-bold mb-3">{product.title}</h4>
            
            <div className="d-flex align-items-center mb-3">
              <span className="text-warning me-2 d-flex align-items-center">
                <FaStar className="me-1" /> {product.rating?.rate}
              </span>
              <span className="text-muted small">
                ({product.rating?.count} reviews)
              </span>
            </div>

            <h3 className="text-primary fw-bold mb-3">${product.price.toFixed(2)}</h3>
            
            <p className="text-secondary" style={{ lineHeight: '1.6' }}>
              {product.description}
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={() => { addToCart(product); onHide(); }}>
          <FaCartPlus className="me-2" /> Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;
