import { Header, Segment, Button, Icon, Item, Message } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const CartItemList = ({ products, user, handleRemoveFromCart, success }) => {
    // console.log(products)
    // const user = false;
    const router = useRouter();

    const mapCartProductsToItems = (products) => {
        return products.map(p => ({
            childKey: p.product._id,
            header: (
                <Item.Header as="a" onClick={() => router.push(`/product?_id=${p.product._id}`)}>
                    {p.product.name}
                </Item.Header>
            ),
            image: p.product.mediaUrl,
            meta: `${p.quantity} x $${p.product.price}`,
            fluid: true,
            extra: (
                <Button 
                    basic
                    icon="remove"
                    floated="right"
                    onClick={() => handleRemoveFromCart(p.product._id)}
                />
            )
        }))
    }

    if(success){
        return(
            <Message 
                success
                header="success"
                content="Your order and payment has been accepted!"
                icon="star outline"
            />
        )
    }

    if(products.length === 0){
        return (
            <>
                <Segment
                    secondary
                    color="green"
                    inverted
                    textAlign="center"
                    placeholder
                >
                    <Header icons="true">
                        <Icon name="shopping basket" />
                        No products in your cart. Add some!
                    </Header>
                    <div>
                        {user ? (
                            <Button
                                color="violet"
                                onClick={() => router.push('/products')}
                            >
                                View Products
                            </Button>
                        ) : (
                            <Button color="blue">
                                Login to add products
                            </Button>
                        )}
                    </div>
                </Segment>
            </>
        );
    }

    return <Item.Group divided items={mapCartProductsToItems(products)} />

}

export default CartItemList;
