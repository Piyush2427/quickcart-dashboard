import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Controls = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange,
  sortOrder,
  onSortChange
}) => {
  return (
    <Row className="mb-4 g-3 bg-light p-3 rounded shadow-sm">
      <Col md={5}>
        <InputGroup>
          <InputGroup.Text className="bg-white border-end-0">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search products by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-start-0 shadow-none hover-shadow"
          />
        </InputGroup>
      </Col>
      <Col md={4}>
        <Form.Select 
          value={selectedCategory} 
          onChange={(e) => onCategoryChange(e.target.value)}
          className="shadow-none cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select 
          value={sortOrder} 
          onChange={(e) => onSortChange(e.target.value)}
          className="shadow-none cursor-pointer"
        >
          <option value="">Sort By Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Controls;
