import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { Card, Message } from 'semantic-ui-react'
import baseUrl from '../../utils/baseUrl';
import CustomSidebar from '../../components/_App/CustomerSidebar';
import ProductCard from '../../components/Store/ProductCard'

const myProducts = ({ products, user, store }) => {
    return (
        <CustomSidebar user={user} store={store}>
            <div className="create-new-products-area">
                <Message>
                    <Message.Header>Store: {store.name}</Message.Header>
                </Message>
                <Card.Group>
                    {products && products.map(product => {
                        return <ProductCard key={product._id} {...product} />
                    })}
                </Card.Group>
            </div>
        </CustomSidebar>
    )
}

myProducts.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx);
    if (!token) {
        return { products: [] };
    }
    const url = `${baseUrl}/api/store`;
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    // console.log(response.data)
    return response.data
}

export default myProducts
