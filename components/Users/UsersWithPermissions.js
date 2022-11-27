import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { Header, Table, Icon } from 'semantic-ui-react';
import baseUrl from '../../utils/baseUrl';
import AllUsers from './AllUsers';

const UsersWithPermissions = () => {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        getUsers()
    }, []);

    const getUsers = async () => {
        const url = `${baseUrl}/api/users`;
        const token = cookie.get('token');
        const payload = {headers: {Authorization: token}};
        const response = await axios.get(url, payload);
        setUsers(response.data);
    }

    return (
        <>
            <Header as="h2">
                <Icon name="settings" />
                Users With Permissions
            </Header>
            
            <Table compact celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Switch</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Joined</Table.HeaderCell>
                        <Table.HeaderCell>Updated</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(user => (
                        <AllUsers key={user._id} user={user} />
                    ))}
                </Table.Body>
            </Table>
        </>
    );
}

export default UsersWithPermissions;
