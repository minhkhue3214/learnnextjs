"use client";
import { Image } from 'antd';
import axios from "axios";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

const User = () => {
  const [users, setUsers] = useState([]);
  const [item, setItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState('Bạn có muốn xoá người dùng này');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    removeUser()
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const deleteHandle = (value) => {
    setItem(value)
    showModal()
  }

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    axios.get('http://127.0.0.1:8000/api/v1/users').then(response => {
      console.log("Data ", response);
      setUsers(response.data)
    })
      .catch(err => {
        console.log("Error", err);
      })
  }

  const removeUser = () => {
    axios.delete(`http://127.0.0.1:8000/api/v1/users/destroy/${item.id}`).then(response => {
      getUsers();
      setOpen(false);
    })
      .catch(err => {
        console.log("Error", err);
      })
  }

  return (
    <div className='w-auto flex justify-center'>
      <table className="border-collapse border border-slate-400 w-7/12">
        <thead>
          <tr>
            <th className="border border-slate-300">Id</th>
            <th className="border border-slate-300">Name</th>
            <th className="border border-slate-300">Email</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              return <tr key={index}>
                <td className="border border-slate-300">{user.id}</td>
                <td className="border border-slate-300">{user.name}</td>
                <td className="border border-slate-300">{user.email}</td>
                <td className="border border-slate-300">
                  <div className='flex justify-around'>
                    <button className='bg-red-600 w-20 flex justify-center p-2 rounded cursor-pointer' onClick={() => deleteHandle(user)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>

      <Modal
        title="Xoá người dùng"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  )
}

export default User