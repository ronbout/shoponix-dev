import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { Label, Checkbox, Popup } from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';
import baseUrl from '../../utils/baseUrl';

const OrderStatus = ({order}) => {
    const [delivered, setDelivered] = React.useState(order.status === 'delivered');

    const isFirstRun = useRef(true);

    useEffect(() => {
        if(isFirstRun.current){
            isFirstRun.current = false;
            return;
        }
        updateStatus();
    }, [delivered]);

    const updateStatus = async () => {
        const url = `${baseUrl}/api/orders`
        const payload = { _id: order._id, status: delivered ? "delivered" : "pending" };
        await axios.put(url, payload);
    }

    const handleChangeStatus = () => {
        setDelivered(prevState => !prevState)
    }

    return(
        <>
            <Label color="blue" content={formatDate(order.createdAt)}/>
            
            <Popup 
                trigger={
                    <Checkbox 
                        toggle 
                        onChange={handleChangeStatus}
                        label={delivered ? "Delivered" : "Pending"}
                        checked={delivered}
                        fitted={true}
                    />
                }
                header='Delivery Status'
                content={delivered ? "Delivered" : "Pending"}
                position='top center'
                on={['hover']}
            />
        </>
    )
}

export default OrderStatus;