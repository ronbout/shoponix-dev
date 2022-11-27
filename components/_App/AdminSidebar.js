import React, { useState } from 'react';
import { Icon, Menu, Segment, Sidebar, Checkbox } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { handleLogout } from '../../utils/auth';

const AdminSidebar = ({ children, user }) => {
    const [visible, setVisible] = useState(true)
    const router = useRouter();
    const isRoot = user && user.role == 'root';
    const isAdmin = user && user.role == 'admin';
    const isRootOrAdmin = isRoot || isAdmin;

    const isActive = (route) => {
        return route == router.pathname;
    }

    const handleVisible = () => {
        setVisible(prevState => !prevState)
    }
    return (
        <>
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation='push'
                    icon='labeled'
                    vertical
                    visible={visible}
                    width='thin'
                >
                    {isRootOrAdmin && (
                        <>
                            <Menu.Item as='a' onClick={() => router.push('/admin/dashboard')} active={isActive('/admin/dashboard')}>
                                <Icon name='dashboard' />
                                Dashboard
                            </Menu.Item>
                            <Menu.Item as='a' onClick={() => router.push('/admin/add-product')} active={isActive('/admin/add-product')}>
                                <Icon name='add square' />
                                Create Product
                            </Menu.Item>
                            <Menu.Item as='a' onClick={() => router.push('/admin/orders')} active={isActive('/admin/orders')}>
                                <Icon name='ordered list' />
                                Orders
                            </Menu.Item>
                            <Menu.Item as='a' onClick={() => router.push('/admin/customers')} active={isActive('/admin/customers')}>
                                <Icon name='users' />
                                Customers
                            </Menu.Item>
                            {isRoot && (
                                <>
                                    <Menu.Item as='a' onClick={() => router.push('/admin/users')} active={isActive('/admin/users')}>
                                        <Icon name='users' />
                                        Admin/Users
                                    </Menu.Item>
                                    <Menu.Item as='a' onClick={() => router.push('/admin/store-requests')} active={isActive('/admin/users')}>
                                        <Icon name='redo' />
                                        Requests
                                    </Menu.Item>
                                </>
                            )}
                            <Menu.Item as='a' onClick={handleLogout} >
                                <Icon name='sign-out' />
                                Logout
                            </Menu.Item>
                        </>
                    )}
                </Sidebar>

                <Sidebar.Pusher>
                    <Checkbox toggle label={visible ? 'Hide Sidebar' : 'Show Sidebar'} onClick={handleVisible} />
                    <Segment basic>
                        {children}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </>
    )
}

export default AdminSidebar
