import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Utility function to get cart items from the cookie
const getCartFromCookie = () => {
  const cartCookie = document.cookie.split('; ').find(row => row.startsWith('cart='));
  return cartCookie ? cartCookie.split('=')[1].split(',') : [];
};

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const cartProductIds = getCartFromCookie();
    if (cartProductIds.length > 0) {
      const uniqueIds = [...new Set(cartProductIds)];
      const productCounts = cartProductIds.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});

      Promise.all(
        uniqueIds.map((id) =>
          fetch(`http://localhost:3000/products/${id}`).then((res) => res.json())
        )
      )
        .then((productData) => {
          const updatedProducts = productData.map(product => ({
            ...product,
            quantity: productCounts[product.product_id],
            total: product.cost * productCounts[product.product_id],
          }));
          setProducts(updatedProducts);
          setSubtotal(updatedProducts.reduce((acc, product) => acc + product.total, 0));
        })
        .catch((err) => console.error('Error fetching cart products:', err));
    }
  }, []);

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {products.map((product) => (
            <div key={product.product_id} className="cart-item">
              <img
                src={`http://localhost:3000/images/${product.image_filename}`}
                alt={product.name}
                className="cart-item-image"
                style={{ width: '100px', height: '100px' }}
              />
              <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p>Price: ${(Number(product.cost).toFixed(2))}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Total: ${(Number(product.total).toFixed(2))}</p>
                <button onClick={() => handleRemoveFromCart(product.product_id)}>Remove from Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <h3>Subtotal: ${(Number(subtotal).toFixed(2))}</h3>
      <div className="cart-actions">
        <Link to="/">Continue Shopping</Link>
        <Link to="/checkout">Complete Purchase</Link>
      </div>
    </div>
  );
};

export default Cart;
