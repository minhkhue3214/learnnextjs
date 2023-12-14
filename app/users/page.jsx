import React from 'react';
import axios from 'axios';

async function getProducts() {
  try {
    const response = await axios.get('http://127.0.0.1:8000', {
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = response.data;
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}



const page = async () => {
  const products = await getProducts()
  return (
    <div>Users</div>
  )
}

export default page