import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopProductsPage = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get('/api/products/top');
        setTopProducts(response.data);
      } catch (error) {
        console.error('Error fetching top products', error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div>
      <h1>Top Rated Products</h1>
      {topProducts.length > 0 ? (
        topProducts.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
          </div>
        ))
      ) : (
        <p>No top products found</p>
      )}
    </div>
  );
};

export default TopProductsPage;
