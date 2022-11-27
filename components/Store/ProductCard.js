import React from 'react'
import { Card, Icon, Image, Button, Modal, TransitionablePortal } from 'semantic-ui-react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'

const ProductCard = ({ _id, mediaUrl, name, price }) => {
    const [modal, setModal] = React.useState(false)
    const router = useRouter()
    const handleDelete = async () => {
        const url = `${baseUrl}/api/product`
        const payload = { params: { _id } }
        axios.delete(url, payload)
        router.reload()
    }
    return (
        <>
            <Card>
                <Image src={mediaUrl} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Link href="/product/[id]" as={`/product/${_id}`}>
                        <a>
                            <Icon name="dollar" />
                            {price}
                        </a>
                    </Link>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button
                            basic
                            icon="edit"
                            color='green'
                            content="Update"
                            onClick={() => Router.replace(`/stores/product/edit/${_id}`)}
                        />
                        <Button
                            basic
                            color='red'
                            icon="trash alternate outline"
                            content="Delete"
                            onClick={() => setModal(true)}
                        />

                        <TransitionablePortal
                            open={modal}
                            onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
                            transition={{ animation: 'scale', duration: 500 }}
                        >
                            <Modal open={modal} size="mini" dimmer="blurring">
                                <Modal.Header>Confirm Delete</Modal.Header>
                                <Modal.Content>
                                    <p>Are you sure you want to delete this product?</p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button
                                        onClick={() => setModal(false)}
                                        content="Cancel"
                                    />
                                    <Button
                                        negative
                                        icon="trash"
                                        labelPosition="right"
                                        content="Delete"
                                        onClick={handleDelete}
                                    />
                                </Modal.Actions>
                            </Modal>
                        </TransitionablePortal>
                    </div>
                </Card.Content>
            </Card>
        </>
    )
}

export default ProductCard
