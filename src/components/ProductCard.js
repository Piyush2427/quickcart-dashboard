import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';

const ProductCard = ({ product, addToCart, onViewDetails }) => {
  return (
    <Card className="h-100 shadow-sm border-0 product-card hover-zoom" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
      <div 
        className="p-3 text-center bg-white" 
        style={{ height: '250px', cursor: 'pointer' }}
        onClick={() => onViewDetails(product)}
      >
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>
      <Card.Body className="d-flex flex-column bg-light rounded-bottom">
        <Badge bg="secondary" className="mb-2 align-self-start">
          {product.category}
        </Badge>
        <Card.Title 
          className="fs-6 text-truncate" 
          title={product.title}
          onClick={() => onViewDetails(product)}
          style={{ cursor: 'pointer' }}
        >
          {product.title}
        </Card.Title>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="fs-5 fw-bold text-primary">${product.price.toFixed(2)}</span>
            <Button variant="success" size="sm" onClick={() => addToCart(product)} className="rounded-pill px-3">
              <FaCartPlus className="me-1" /> Add
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;