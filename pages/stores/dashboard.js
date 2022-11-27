import React, { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios';
import { Card, Icon, Image } from 'semantic-ui-react'
import Link from 'next/link'
import CustomSidebar from '../../components/_App/CustomerSidebar'
import formatDate from '../../utils/formatDate'
import baseUrl from '../../utils/baseUrl';

const dasboard = ({ user, store }) => {
    const { token } = parseCookies()

    const [productsCount, setProductsCount] = useState()

    useEffect(() => {
        const fetchTotalCount = async () => {
            const payload = { headers: { Authorization: token } }
            const url = `${baseUrl}/api/store`
            const response = await axios.get(url, payload)
            const { totalProducts } = response.data
            setProductsCount(totalProducts)
        }

        fetchTotalCount()
    }, [])

    return (
        <CustomSidebar user={user} store={store}>
            <div className="create-new-products-area">
                <Card>
                    <Image src='https://res.cloudinary.com/dev-empty/image/upload/v1630922586/Untitled-1.png' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{store.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Created {formatDate(store.createdAt)}</span>
                        </Card.Meta>
                        <Card.Description>
                            {store.aboutText}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Link href="/stores/products">
                            <a>
                                <Icon name='list' />
                                {productsCount} Products
                            </a>
                        </Link>
                    </Card.Content>
                </Card>
            </div>
        </CustomSidebar>
    )
}

export default dasboard
