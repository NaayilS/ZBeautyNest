import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/products/sephora/${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  return (
    <div>
      <h1>ZBeautyNest</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products..."
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
