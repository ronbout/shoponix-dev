import React from 'react'
import { Icon, Table } from 'semantic-ui-react'
import axios from 'axios'
import AdminSidebar from '../../components/_App/AdminSidebar'
import baseUrl from '../../utils/baseUrl'
import StoreStatus from '../../components/Admin/StoreStatus'
import StoreReqPagination from '../../components/Admin/StoreReqPagination'

const storeRequest = ({ stores, totalPages, user }) => {
    return (
        <>
            <AdminSidebar user={user}>
                <div className="create-new-products-area">
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Store</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {stores && stores.map(store => {
                                return (
                                    <Table.Row key={store._id}>
                                        <StoreStatus store={store} />

                                        <Table.Cell>{store.name}</Table.Cell>

                                        <Table.Cell>{store.email}</Table.Cell>

                                        {store.status == 'approved' ? (
                                            <Table.Cell positive>
                                                <Icon name='checkmark' />
                                                {store.status.toUpperCase()}
                                            </Table.Cell>
                                        ) : store.status == 'pending' ? (
                                            <Table.Cell warning>
                                                <Icon name='attention' />
                                                {store.status.toUpperCase()}
                                            </Table.Cell>

                                        ) : (
                                            <Table.Cell error>
                                                <Icon name='close' />
                                                {store.status.toUpperCase()}
                                            </Table.Cell>

                                        )}
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>

                    <StoreReqPagination 
                        totalPages={totalPages} 
                    />
                </div>
            </AdminSidebar>
        </>
    )
}

storeRequest.getInitialProps = async (ctx) => {
    const page = ctx.query.page ? ctx.query.page : "1";
    const size = 10;
    const url = `${baseUrl}/api/store/requests`;
    const payload = { params: { page, size } }
    const response = await axios.get(url, payload);

    return response.data
}

export default storeRequest
