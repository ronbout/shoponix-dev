import React from 'react'
import { Button, Modal, TransitionablePortal } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import Router, { useRouter } from 'next/router'

const ProductAttributes = ({ product, user }) => {
    const [modal, setModal] = React.useState(false)
    const router = useRouter()

    const { _id } = product

    const isRoot = user && user.role == 'root'
    const isAdmin = user && user.role == 'admin'
    const isRootOrAdmin = isRoot || isAdmin
    const isProductOwner = user && user._id == product.user

    const handleDelete = async () => {
        const url = `${baseUrl}/api/product`
        const payload = { params: { _id } }
        axios.delete(url, payload)
        router.push('/')
    }

    return (
        <>
            {(isRootOrAdmin || isProductOwner) && (
                <>
                    <Button
                        icon="edit"
                        color="green"
                        content="Update Product"
                        onClick={() => Router.replace(`/stores/product/edit/${_id}`)}
                        className="mr-10"
                    />
                    <Button
                        icon="trash alternate outline"
                        color="red"
                        content="Delete Product"
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
                </>
            )}

        </>
    );
}

export default ProductAttributes;
