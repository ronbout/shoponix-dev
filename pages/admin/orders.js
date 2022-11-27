import axios from 'axios';
import {Container} from 'semantic-ui-react';
import AdminSidebar from '../../components/_App/AdminSidebar';
import AllOrders from "../../components/Orders/AllOrders";
import baseUrl from '../../utils/baseUrl';

const Orders = ({ user, orders }) => {
    // console.log(user)
    // console.log(orders)
    return (
        <>
            <AdminSidebar user={user}>
                <Container className="order-history-area">
                    <AllOrders orders={orders} />
                </Container>
            </AdminSidebar>
        </>
    );
}

Orders.getInitialProps = async () => {
    const url = `${baseUrl}/api/all-orders`;
    const response = await axios.get(url);
    // console.log(response)
    return response.data;
}
  
export default Orders;