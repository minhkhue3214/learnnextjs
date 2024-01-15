import { Table, Button } from 'antd';
import React from 'react';

const MyTable = ({ users }) => {
    const handleAction = (async (record) => {
        // Your server-side logic for the action
        console.log('Clicked Action for user:', record);

        // Return any data you want to expose to the client
        return { success: true };
    });

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" onClick={() => handleAction(record)}>
                    Action
                </Button>
            ),
        },
    ];

    return <Table dataSource={users} columns={columns} />;
};

export default MyTable;
