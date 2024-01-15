"use client";
import React, { useEffect } from 'react'

const AddCartBtn = ({ product }) => {

  useEffect(() => {
    console.log("test 1");
  }, [])

  const addToCart = () => {
    let localCart = localStorage.getItem('localCart') ? JSON.parse(localStorage.getItem('localCart')) : []
    const existingProductIndex = localCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      localCart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      localCart.push(product);
    }

    addToLocalStorage(localCart)
    // const updatedCart = [...cart];
    // console.log("localCart", localCart);
    // console.log("product", product);
  }

  const addToLocalStorage = (productsInCart) => {
    const arrayJsonString = JSON.stringify(productsInCart);
    localStorage.setItem('localCart', arrayJsonString);
}

  return (
    <>
      <button onClick={() => addToCart()} className='bg-red-300 w-24 p-2 rounded'>Buy</button>
    </>
  )
}

export default AddCartBtn