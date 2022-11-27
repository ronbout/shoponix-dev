import React from 'react';
import { Input } from "semantic-ui-react";
import { useRouter } from 'next/router';
import axios from 'axios';
import cookie from 'js-cookie';
import baseUrl from '../../utils/baseUrl';
import catchErrors from '../../utils/catchErrors';

const AddProductToCart = ({ user, productId }) => {
    const [quantity, setQuantity] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        let timeout;
        if (success){
            timeout = setTimeout(() => {
                setSuccess(false)
            }, 3000);
        }
        return () => {
            clearTimeout(timeout);
        }
    }, [success])

    const handleAddProductToCart = async () => {
        try {
            setLoading(true);
            const url = `${baseUrl}/api/cart`;
            const payload = { quantity, productId };
            const token = cookie.get('token');
            const headers = { headers: {Authorization: token} };
            await axios.put(url, payload, headers);
            setSuccess(true);
        } catch (error) {
            catchErrors(error, window.alert);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Input 
                type="number"
                min="1"
                max="10"
                placeholder="Quantity"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                action={
                    user && success ? {
                        color: 'blue',
                        content: 'Item Added!',
                        icon: 'plus cart',
                        disabled: true
                    } : 
                    user ? {
                    color: 'violet',
                    content: 'Add to Cart',
                    icon: 'plus cart',
                    loading: loading,
                    disbaled: `${loading}`,
                    onClick: handleAddProductToCart
                } : {
                    color: 'green',
                    content: 'Login to purchase',
                    icon: 'sign-in',
                    onClick: () => router.push('/auth/login')
                }}
            />
        </>
    );
}

export default AddProductToCart;
