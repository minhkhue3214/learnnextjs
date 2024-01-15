"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getProduct from "../../../lib/Products/getProduct";
import removeProduct from "../../../lib/Products/removeProduct";
import updateProduct from "../../../lib/Products/updateProduct";

const page = ({ params }) => {
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

    useEffect(() => {
        getProduct(params.productId)
            .then(productData => {
                console.log("Product Data:", productData);
                setFormData({
                    name: productData.name || '',
                    image: productData.image || null,
                    price: productData.price || '',
                    description: productData.description || '',
                });
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, [])

    const handleUpdateProduct = (e) => {
        e.preventDefault()
        updateProduct(params.productId, formData)
            .then(productData => {
                console.log("Update data:", productData);
                if (productData.status) {
                    router.push('/products');
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-indigo-400">
                <form className="w-96 p-6 shadow-lg bg-white rounded-md" encype="multipart/form-data">
                    <h1 className="text-3xl block text-center font-semibold">Sửa Sản phẩm</h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="name" className="block text-base mb-2">Name</label>
                        <input type="text" onChange={handleChange} id="name" value={formData.name} className="border w-full text-base px-2 py-1 focus:outline-none focus:right-0 focus:border-gray-600" placeholder="Enter name..." />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="name" className="block text-base mb-2">Image</label>
                        <input type="file" id="image" onChange={handleImageChange} className="border w-full text-base px-2 py-1 focus:outline-none focus:right-0 focus:border-gray-600" />
                        {/* {product.image && <p>Selected File: {product.image}</p>} */}
                    </div>
                    <div className="mt-3">
                        <label htmlFor="price" className="block text-base mb-2">Price</label>
                        <input type="number" onChange={handleChange} id="price" value={formData.price} className="border w-full text-base px-2 py-1 focus:outline-none focus:right-0 focus:border-gray-600" placeholder="Enter price..." />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="description" className="block text-base mb-2">Description</label>
                        <input type="text" onChange={handleChange} id="description" value={formData.description} className="border w-full text-base px-2 py-1 focus:outline-none focus:right-0 focus:border-gray-600" placeholder="Enter description..." />
                    </div>
                    <button onClick={(e) => handleUpdateProduct(e)} className="border-2 mt-5 border-indigo-700 bg-indigo-700 text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">Update</button>
                </form>
            </div>
        </>
    )
}

export default page