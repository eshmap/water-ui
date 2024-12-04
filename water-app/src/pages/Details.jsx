import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Utility functions for working with cookies
const getCartFromCookie = () => {
  const cartCookie = document.cookie.split('; ').find(row => row.startsWith('cart='));
  return cartCookie ? cartCookie.split('=')[1].split(',') : [];
};

const setCartToCookie = (cartItems) => {
  document.cookie = `cart=${cartItems.join(',')}; path=/;`;
};

const Details = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // Fetch the product details when the component mounts
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error('Error fetching product:', err));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItems = getCartFromCookie();
    cartItems.push(product.product_id);
    setCartToCookie(cartItems);
    alert('Product added to cart!');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <div className="product-info">
        <img
          src={`http://localhost:3000/images/${product.image_filename}`}
          alt={product.name}
          className="product-image-large"
        />
        <h2>{product.name}</h2>
        <p><strong>Price:</strong> ${product.cost}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <div className="product-actions">
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={() => navigate('/')}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
