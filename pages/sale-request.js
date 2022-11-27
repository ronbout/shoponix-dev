import React from 'react'
import cookie from 'js-cookie'
import { Container } from "semantic-ui-react"
import { Segment, Button, Icon, Header, Modal, Checkbox, Form, Message } from 'semantic-ui-react'
import axios from 'axios'
import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'

const INITIAL_REQUEST = {
    name: '',
    web: '',
    email: '',
    aboutText: ''
};

const saleRequest = () => {
    const [open, setOpen] = React.useState(false)

    const [request, setRequest] = React.useState(INITIAL_REQUEST);
    const [disabled, setDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    React.useEffect(() => {
        const isRequest = Object.values(request).every(el => Boolean(el));
        isRequest ? setDisabled(false) : setDisabled(true)
    }, [request]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequest(prevState => ({ ...prevState, [name]: value }));
        // console.log(request)
    }


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const token = cookie.get('token')
            const url = `${baseUrl}/api/store/create`;
            const payload = { ...request };
            const headers = { headers: { Authorization: token } };
            const response = await axios.post(url, payload, headers);

            // console.log(response.data)
            setSuccess(response.data)
            setOpen(false)
            setRequest(INITIAL_REQUEST)
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Container>
                <div className="about-area bg-white">
                    {success && (
                        <Message
                            attached
                            icon="check circle"
                            header="Congratulations!"
                            content={success}
                            color="green"
                        />
                    )}

                    <div className="store-request">
                        <img 
                            src="https://res.cloudinary.com/dev-empty/image/upload/v1630831419/5703647.jpg" 
                            alt="about" 
                        />
                        <div className="mdl-btn">
                            <div className="d-table">
                                <div className="table-cell">
                                    <Modal
                                        closeIcon
                                        size="tiny"
                                        open={open}
                                        trigger={(
                                            <Button positive>
                                                <Icon name='wpforms' />
                                                Request!
                                            </Button>
                                        )}
                                        onClose={() => setOpen(false)}
                                        onOpen={() => setOpen(true)}
                                    >
                                        <Header 
                                            icon='dollar sign' 
                                            content='Sale Request Form' 
                                        />

                                        <Modal.Content>
                                            <Segment>
                                                <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
                                                    <Message
                                                        error
                                                        header="Oops!"
                                                        content={error}
                                                    />

                                                    <Form.Field>
                                                        <Form.Input
                                                            icon="shop"
                                                            iconPosition="left"
                                                            label="Store Name"
                                                            placeholder="Store Name"
                                                            name="name"
                                                            value={request.name}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Field>

                                                    <Form.Field>
                                                        <Form.Input
                                                            icon="home"
                                                            iconPosition="left"
                                                            label="Website"
                                                            placeholder="https://example.com"
                                                            name="web"
                                                            value={request.web}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Field>

                                                    <Form.Field>
                                                        <Form.Input
                                                            icon="envelope"
                                                            iconPosition="left"
                                                            label="Email"
                                                            placeholder="Email"
                                                            name="email"
                                                            type="email"
                                                            value={request.email}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Field>

                                                    <Form.Field>
                                                        <Form.TextArea
                                                            label='About'
                                                            placeholder='Tell us more about your store...'
                                                            name="aboutText"
                                                            value={request.aboutText}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Field>

                                                    <Form.Field>
                                                        <Checkbox
                                                            label='I agree to the Terms and Conditions'
                                                        />
                                                    </Form.Field>

                                                    <Button
                                                        icon="location arrow"
                                                        type="submit"
                                                        content="Request Now"
                                                        color="green"
                                                        disabled={disabled || loading}
                                                    />
                                                </Form>
                                            </Segment>
                                        </Modal.Content>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default saleRequest


