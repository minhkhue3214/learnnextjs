"use client";
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios';

const navbar = () => {
  const router = useRouter()

  const onLogout = async () => {
    // console.log("Testing logout",JSON.parse(localStorage.getItem("token")));
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response", response);
      if (response.data.status == true) {
        router.push('/');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='w-full h-10 bg-blue-500 flex items-center justify-around'>
      <Link href="/products" className='text-slate-100 hover:text-gray-950'>Products</Link>
      <Link href="/packages" className='text-slate-100 hover:text-gray-950'>Packages</Link>
      <Link href="/users" className='text-slate-100 hover:text-gray-950'>Users</Link>
      <button className='text-slate-100 hover:text-gray-950' onClick={() => { onLogout() }}>Logout</button>
    </div>
  )
}

export default navbar