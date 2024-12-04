import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const apiHost = import.meta.env.VITE_APP_HOST;

  useEffect(() => {
    fetch(`${apiHost}/products/all`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, [apiHost]);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3 className="product-name">{product.name}</h3>
          <img
            src={`${apiHost}/images/${product.image_filename}`}
            alt={product.name}
            className="product-image"
          />
          <p className="product-price">${(Number(product.cost)).toFixed(2)}</p>
          <Link to={`/details/${product.product_id}`} className="view-details-link">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
