import { Header, Accordion, Label, Segment, Icon, Button, List, Image, Checkbox, Popup } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import formatDate from '../../utils/formatDate';

const OrdersHistory = ({ orders = [] }) => {
    const router  = useRouter();

    const mapOrdersToPanels = (orders) => {
        return orders.map(order => ({
            key: order._id,
            title: {
                content: (
                    <>
                        <Label color="blue" content={formatDate(order.createdAt)}/>
                        <Popup 
                            trigger={
                                <Checkbox 
                                    toggle 
                                    disabled
                                    label={(order.status == "delivered") ? "Delivered" : "Pending"}
                                    checked={(order.status == "delivered") ? true : false}
                                    fitted={true}
                                />
                            }
                            header='Delivery Status'
                            content={order.status == "delivered" ? "Delivered" : "Pending"}
                            position='top center'
                            on={['hover']}
                        />
                    </>
                )
            },
            content: {
                content: (
                    <>
                        <List.Header as="h3">
                            Total: ${order.total}
                            <Label 
                                content={order.email}
                                icon="mail"
                                basic
                                horizontal
                                style={{marginLeft: '1em'}}
                            />
                        </List.Header>
                        <List>
                            {order.products.map(p => (
                                <List.Item key={p.product._id}>
                                    <Image avatar src={p.product.mediaUrl} />
                                    <List.Content>
                                        <List.Header>
                                            {p.product.name}
                                        </List.Header>
                                        <List.Description>
                                            {p.quantity} . ${p.product.price}
                                        </List.Description>
                                    </List.Content>
                                    <List.Content floated="right">
                                        <Label tag color="red" size="tiny">
                                            {p.product.sku}
                                        </Label>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    </>
                )
            }
        }))
    }
    return (
        <>
            <Header as="h2">
                <Icon name="folder open" />
                My Order History
            </Header>
            {orders.length === 0 ? (
                <Segment inverted tertiary color="pink" textAlign="center">
                    <Header icon>
                        <Icon name="copy outline" />
                        No Past Orders.
                    </Header>
                    <Button onClick={() => router.push('/products')} color="violet">
                        View Products
                    </Button>
                </Segment>
            ) : (
                <Accordion 
                    fluid
                    styled
                    exclusive={false}
                    panels={mapOrdersToPanels(orders)}
                />
            )}
        </>
    );
}

export default OrdersHistory;
