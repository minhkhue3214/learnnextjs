"use client";
import { Image } from 'antd';
import axios from "axios";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import getAllProducts from "../../lib/Products/getAllProducts";

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

const Products = () => {
    const [products, setProducts] = useState([]);
    const [item, setItem] = useState(null);
    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState('Bạn có muốn xoá sản phẩm này');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        removeProduct()
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const deleteHandle = (value) => {
        setItem(value)
        showModal()
    }

    useEffect(() => {
        getProducts();
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

    const removeProduct = () => {
        axios.delete(`http://127.0.0.1:8000/api/v1/products/destroy/${item.id}`).then(response => {
            getProducts();
            setOpen(false);
        })
            .catch(err => {
                console.log("Error", err);
            })
    }

    return (
        <div className='w-auto flex justify-center'>
            <Link href="http://localhost:3000/products/create" className='text-red-500 bg-blue-200 hover:text-gray-950 w-24 h-10 flex justify-center items-center rounded-md mr-20'>Add</Link>
            {/* <Table dataSource={products} columns={columns} style={{ width: '80%', margin: '20px' }} /> */}
            <table className="border-collapse border border-slate-400 w-9/12">
                <thead>
                    <tr>
                        <th className="border border-slate-300">Name</th>
                        <th className="border border-slate-300">Image</th>
                        <th className="border border-slate-300">Price</th>
                        <th className="border border-slate-300">Description</th>
                        <th className="border border-slate-300">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => {
                            return <tr key={index}>
                                <td className="border border-slate-300">{product.name}</td>
                                {/* <td className="border border-slate-300">{product.image}</td> */}
                                <td className="border border-slate-300">
                                    {product.image && <Image
                                        width={100}
                                        src={`http://127.0.0.1:8000${product.image}`}
                                    />}
                                </td>
                                <td className="border border-slate-300">{product.price}</td>
                                <td className="border border-slate-300">{product.description}</td>
                                <td className="border border-slate-300">
                                    <div className='flex justify-around'>
                                        <button className='bg-red-600 w-20 flex justify-center p-2 rounded cursor-pointer' onClick={() => deleteHandle(product)}>
                                            Delete
                                        </button>
                                        <Link href={`/products/${product.id}`} className='bg-blue-600 w-20 flex justify-center p-2 rounded cursor-pointer'>Detail</Link>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

            <Modal
                title="Xoá sản phẩm"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    )
}

export default Products