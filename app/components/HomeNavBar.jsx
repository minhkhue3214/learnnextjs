"use client";
import React, { useEffect, useState } from 'react';
import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Modal } from 'antd';
import storeReceipt from '@/lib/Receipts/storeReceipt';
import getProfile from '@/lib/Authentication/getProfile';
import logout from '@/lib/Authentication/logout';
import Link from 'next/link';

const HomeNavBar = () => {
    const [carts, setCarts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [user, setUser] = useState(null);

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

    const showModal = () => {
        setIsModalOpen(true);
        let localCart = localStorage.getItem('localCart') ? JSON.parse(localStorage.getItem('localCart')) : []
        setCarts(localCart)
        handleCaculateCart(localCart)
    };

    useEffect(() => {
        let localCart = localStorage.getItem('localCart') ? JSON.parse(localStorage.getItem('localCart')) : []
        console.log("localCart", localCart);
        setCarts(localCart)
        handleCaculateCart(localCart)
    }, [])

    const handleCaculateCart = (productsInCart) => {
        let total = 0
        for (let i = 0; i < productsInCart.length; i++) {
            total = total + (productsInCart[i].price * productsInCart[i].quantity)
        }
        setTotalPrice(total)
    }

    const handleInputChange = (event, index) => {
        let value = event.target.value;
        console.log("handleInputChange", value);
        let updatedCart = [...carts];

        let productQuantity = parseInt(value, 10);

        if (productQuantity <= 0) {
            updatedCart.splice(index, 1);
        } else {
            updatedCart[index].quantity = parseInt(value, 10);
        }

        setCarts(updatedCart);
        handleCaculateCart(updatedCart)
        addToLocalStorage(updatedCart)
    };

    const addToLocalStorage = (productsInCart) => {
        const arrayJsonString = JSON.stringify(productsInCart);
        localStorage.setItem('localCart', arrayJsonString);
    }

    const handleOk = () => {
        if (!user) return alert("Hãy đăng nhập để tiến hành thanh toán");
        if (!carts.length) return alert("Hãy chọn sản phẩm để thanh toán");

        const data = { user_id: user.id, price: totalPrice };

        storeReceipt(data)
            .then(responseData => {
                console.log('Post successful:', responseData);
                setIsModalOpen(false);
                setCarts([]);
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
        <>
            <div className='flex justify-between bg-blue-700 w-full h-12 items-center'>
                <h1 className='text-2xl'>Trang mua bán sản phẩm</h1>
                <div className='flex items-center gap-20 mr-10'>
                    <ShoppingCartOutlined style={{ fontSize: 34 }} onClick={showModal} />
                    {user ? <LogoutOutlined style={{ fontSize: 34 }} onClick={() => onLogout()} /> : <Link href="/login" className='text-2xl cursor-pointer hover:text-red-500'>Login</Link>}
                </div>
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
                        {carts?.map((c, index) => (
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
        </>

    )
}

export default HomeNavBar