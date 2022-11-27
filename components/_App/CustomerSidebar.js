import React, { useState } from 'react';
import { Icon, Menu, Segment, Sidebar, Checkbox } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { handleLogout } from '../../utils/auth';

const CustomSidebar = ({ children, user, store }) => {
    const [visible, setVisible] = useState(true)
    const router = useRouter()
    const isRoot = user && user.role == 'root'
    const isAdmin = user && user.role == 'admin'
    const isRootOrAdmin = isRoot || isAdmin
    const hasStore = store && store.status == 'approved'

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
                    {hasStore && (
                        <>
                            <Menu.Item as='a' onClick={() => router.push('/stores/dashboard')} active={isActive('/stores/dashboard')}>
                                <Icon name='dashboard' />
                                Dashboard
                            </Menu.Item>

                            <Menu.Item as='a' onClick={() => router.push('/stores/add-product')} active={isActive('/admin/add-product')}>
                                <Icon name='add square' />
                                Create Product
                            </Menu.Item>

                            <Menu.Item as='a' onClick={() => router.push('/stores/products')} active={isActive('/admin/add-product')}>
                                <Icon name='list' />
                                My Products
                            </Menu.Item>

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

export default CustomSidebar
