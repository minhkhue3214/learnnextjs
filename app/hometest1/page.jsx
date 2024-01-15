"use client";
import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Modal, Table } from 'antd';
import storeReceipt from '@/lib/Receipts/storeReceipt';
import getProfile from '@/lib/Authentication/getProfile';
import logout from '@/lib/Authentication/logout';
import Link from 'next/link';


// async function getProducts() {
//     try {
//         const response = await axios.get('http://127.0.0.1:8000/api/v1/products');
//         const data = response.data;
//         // console.log("res", data);
//         return data;
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         throw error;
//     }
// }

const page = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (!user) return alert("Hãy đăng nhập để tiến hành thanh toán");
        if (!cart.length) return alert("Hãy chọn sản phẩm để thanh toán");

        const data = { user_id: user.id, price: totalPrice };

        storeReceipt(data)
            .then(responseData => {
                console.log('Post successful:', responseData);
                setIsModalOpen(false);
                setCart([]);
                localStorage.removeItem("localCart");
                setTotalPrice(0)
            })
            .catch(error => {
                console.error('Error during post:', error);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getProfile()
            .then(responseData => {
                console.log('get profile successful:', responseData.data.name);
                setUser(responseData.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])

    useEffect(() => {
        getProducts();
        let localCart = localStorage.getItem('localCart') ? JSON.parse(localStorage.getItem('localCart')) : []
        setCart(localCart)
        handleCaculateCart(localCart)
    }, [])

    const getProducts = () => {
        axios.get('http://127.0.0.1:8000/api/v1/products').then(response => {
            console.log("Data ", response);
            setProducts(response.data)
        })
            .catch(err => {
                console.log("Error", err);
            })
    }

    const addToCart = (product) => {
        const updatedCart = [...cart];
        const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
            updatedCart[existingProductIndex].quantity += 1;
        } else {
            product.quantity = 1;
            updatedCart.push(product);
        }
        setCart(updatedCart);
        handleCaculateCart(updatedCart)
        addToLocalStorage(updatedCart)
    }

    const addToLocalStorage = (productsInCart) => {
        const arrayJsonString = JSON.stringify(productsInCart);
        localStorage.setItem('localCart', arrayJsonString);
    }

    const handleCaculateCart = (productsInCart) => {
        let total = 0
        for (let i = 0; i < productsInCart.length; i++) {
            total = total + (productsInCart[i].price * productsInCart[i].quantity)
        }
        setTotalPrice(total)
    }

    const handleInputChange = (event, index) => {
        let value = event.target.value;
        let updatedCart = [...cart];
        let productQuantity = parseInt(value, 10);

        if (productQuantity <= 0) {
            updatedCart.splice(index, 1);
        } else {
            updatedCart[index].quantity = parseInt(value, 10);
        }


        setCart(updatedCart);
        handleCaculateCart(updatedCart)
        addToLocalStorage(updatedCart)
    };

    const onLogout = () => {
        logout()
            .then(responseData => {
                console.log('logout successful:', responseData);
                setUser(null);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='bg-gray-800 w-full h-full'>
            <div className='flex justify-between bg-blue-700 w-full h-12 items-center
        '>
                <h1 className='text-2xl'>Trang mua bán sản phẩm</h1>
                <div className='flex items-center gap-20 mr-10'>
                    <ShoppingCartOutlined style={{ fontSize: 34 }} onClick={showModal} />
                    {user ? <LogoutOutlined style={{ fontSize: 34 }} onClick={() => onLogout()} /> : <Link href="/login" className='text-2xl cursor-pointer hover:text-red-500'>Login</Link>}
                </div>
            </div>

            <div className='flex flex-wrap bg-green-400 w-full mt-4'>
                {
                    products?.map((product, index) => {
                        return <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg border-2 border-gray-500 bg-blue-400 m-2">
                            <img className="w-full h-80 object-cover" src={`http://127.0.0.1:8000${product.image}`} />
                            <div className="flex justify-around px-2 py-2">
                                <div className="font-bold text-xl mb-2">{product.name}</div>
                                <div className="font-bold text-xl mb-2">{product.price}</div>
                            </div>
                            <div className='flex px-10 mb-2'>
                                <button href="/" onClick={() => addToCart(product)} className='bg-red-300 w-24 p-2 rounded'>Buy</button>
                            </div>
                        </div>
                    })
                }
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.map((c, index) => (
                            <tr key={index} className={index === 0 ? 'mt-10' : ''}>
                                <td className="text-center">{c.name}</td>
                                <td className="text-center">
                                    <img className="mx-auto h-10 w-20 object-cover" src={`http://127.0.0.1:8000${c.image}`} alt={c.name} />
                                </td>
                                <td className="text-center">{c.price}</td>
                                <td className="text-center">
                                    <input value={c.quantity} type="number" onChange={(event) => handleInputChange(event, index)} className='w-10 border-2 border-black' />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex'>
                    Tổng tiền:{totalPrice}
                </div>
            </Modal>
        </div>
    )
}

export default page