"use client";
import Link from 'next/link'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

const page = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/login", {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("response", response.data.token);

      // Convert the object to a string and store it
      localStorage.setItem("token", JSON.stringify(response.data.token));

      if (response.data.status === true) {
        router.push('/home');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-400">
      <form onSubmit={handleSubmit} className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl block text-center font-semibold">Login</h1>
        <hr className="mt-3" />
        <div className="mt-3">
          <label htmlFor="email" className="block text-base mb-2">Email</label>
          <input type="email" onChange={handleChange} id="email" className="border w-full text-base px-2 py-1 focus:outline-none focus:right-0 focus:border-gray-600" placeholder="Enter email..." />
        </div>
        <div className="mt-3">
          <label htmlFor="password" className="block text-base mb-2">Password</label>
          <input type="password" onChange={handleChange} id="password" className="border w-full text-base px-2 py-1 focus:outline-none focus:right-0 focus:border-gray-600" placeholder="Enter password..." />
        </div>
        <div className='flex mt-3 bg-red-500 items-center justify-center w-20 p-1 border-2'>
          <Link href="/" className='text-slate-100 hover:text-gray-950'>Sign up</Link>
        </div>
        <button type="submit" className="border-2 mt-5 border-indigo-700 bg-indigo-700 text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">Login</button>
      </form>
    </div>
  )
}

export default page