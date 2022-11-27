import React, { useEffect, useRef } from 'react';
import { Checkbox, Table } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import formatDate from '../../utils/formatDate';

const AllUsers = ({user}) => {
    const [admin, setAdmin] = React.useState(user.role === 'admin');

    const isFirstRun = useRef(true);

    useEffect(() => {
        if(isFirstRun.current){
            isFirstRun.current = false;
            return;
        }
        updatePermission();
    }, [admin]);

    const updatePermission = async () => {
        const url = `${baseUrl}/api/account`
        const payload = { _id: user._id, role: admin ? "admin" : "user" };
        await axios.put(url, payload);
    }

    const handleChangePermission = () => {
        setAdmin(prevState => !prevState)
    }

    return(
        <>
            <Table.Row>
                <Table.Cell collapsing>
                    <Checkbox checked={admin} toggle onChange={handleChangePermission} />
                </Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
                <Table.Cell>{formatDate(user.updatedAt) }</Table.Cell>
                <Table.Cell>{admin ? "Admin" : "User"}</Table.Cell>
            </Table.Row>
        </>
    );
}

export default AllUsers;