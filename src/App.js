import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import TopNavbar from './components/Navbar';
import Controls from './components/Controls';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  
  // Cart & Modal States
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category);
    return [...new Set(allCategories)];
  }, [products]);

  // Derived state: Filtered and Sorted Products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Filter
    if (searchQuery) {
      result = result.filter((p) => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Category Filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Sort
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortOrder]);

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="bg-light min-vh-100">
      <TopNavbar cartCount={cartCount} />
      
      <Container className="py-2">
        {/* Controls Section */}
        <Controls 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        {/* Status / Content Section */}
        {isLoading ? (
          <div className="d-flex flex-column align-items-center justify-content-center my-5 py-5">
            <Spinner animation="border" variant="primary" role="status" />
            <span className="mt-3 text-muted">Loading products...</span>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center my-5">
            <Alert.Heading>Oops! Something went wrong.</Alert.Heading>
            <p>{error}</p>
          </Alert>
        ) : (
          <>
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center my-5 py-5 text-muted">
                <h4>No products found</h4>
                <p>Try adjusting your search or filters.</p>
              </div>
            ) : (
              <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-5">
                {filteredAndSortedProducts.map((product) => (
                  <Col key={product.id}>
                    <ProductCard 
                      product={product} 
                      addToCart={handleAddToCart}
                      onViewDetails={handleViewDetails}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>

      {/* Product Details Modal */}
      <ProductDetailsModal 
        show={!!selectedProduct} 
        onHide={handleCloseModal} 
        product={selectedProduct}
        addToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;