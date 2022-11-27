import { parseCookies } from 'nookies';
import axios from 'axios';
import {Container} from 'semantic-ui-react';
import OrdersHistory from "../components/MyOrdersHistory/OrdersHistory";
import baseUrl from '../utils/baseUrl';

const MyOrdersHistory = ({ orders }) => {
    // console.log(orders)
    return (
        <>
            <Container className="order-history-area">
                <OrdersHistory 
                    orders={orders} 
                />
            </Container>
        </>
    );
}

MyOrdersHistory.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx);
    if(!token) {
        return { orders: []}
    }

    const payload = {headers: {Authorization: token}}
    const url = `${baseUrl}/api/orders`;
    const response = await axios.get(url, payload);
    return response.data;
}
  
export default MyOrdersHistory;