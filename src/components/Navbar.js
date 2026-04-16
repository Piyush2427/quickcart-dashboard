import React from 'react';
import { Navbar, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const TopNavbar = ({ cartCount }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 sticky-top">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3">QuickCart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Navbar.Text className="d-flex align-items-center">
            <FaShoppingCart size={24} className="me-2 text-white" />
            <Badge pill bg="primary" style={{ fontSize: '1rem' }}>
              {cartCount}
            </Badge>{' '}
            <span className="ms-1 text-white d-none d-sm-inline fw-semibold ms-2">Cart</span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;