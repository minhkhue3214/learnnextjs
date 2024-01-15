"use client";
import Link from 'next/link'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

const page = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    image: null,
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("image",e.ta);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/products/store", {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        image:formData.image,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("response", response.status);

      if (response.status === 201) {
        router.push('/products');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-400">
      <form onSubmit={handleSubmit} className="w-96 p-6 shadow-lg bg-white rounded-md" encype="multipart/form-data">
        <h1 className="text-3xl block text-center font-semibold">Thêm Sản phẩm</h1>
        <hr className="mt-3" />
        <div className="mt-3">
          <label htmlFor="name" className="block text-base mb-2">Name</label>
          <input type="text" onChange={handleChange} id="name" className="border w-full text-base px-2 py-1 focus:outline-none focus:right-0 focus:border-gray-600" placeholder="Enter name..." />
        </div>
        <div className="mt-3">
          <label htmlFor="name" className="block text-base mb-2">Image</label>
          <input type="file" onChange={handleImageChange} id="image" className="border w-full text-base px-2 py-1 focus:outline-none focus:right-0 focus:border-gray-600" placeholder="Enter email..." />
        </div>
        <div className="mt-3">
          <label htmlFor="price" className="block text-base mb-2">Price</label>
          <input type="number" onChange={handleChange} id="price" className="border w-full text-base px-2 py-1 focus:outline-none focus:right-0 focus:border-gray-600" placeholder="Enter price..." />
        </div>
        <div className="mt-3">
          <label htmlFor="description" className="block text-base mb-2">Description</label>
          <input type="text" onChange={handleChange} id="description" className="border w-full text-base px-2 py-1 focus:outline-none focus:right-0 focus:border-gray-600" placeholder="Enter description..." />
        </div>
        <button type="submit" className="border-2 mt-5 border-indigo-700 bg-indigo-700 text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">Thêm</button>
      </form>
    </div>
  )
}

export default page