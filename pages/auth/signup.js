import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import catchErrors from '../../utils/catchErrors';
import baseUrl from '../../utils/baseUrl';
import { handleLogin } from '../../utils/auth';

const INITIAL_USER = {
    name: '',
    email: '',
    password: ''
};

const Signup = () => {
    const [user, setUser] = React.useState(INITIAL_USER);
    const [disabled, setDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        const isUser = Object.values(user).every(el => Boolean(el));
        isUser ? setDisabled(false) : setDisabled(true)
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const url = `${baseUrl}/api/signup`;
            const payload = { ...user };
            const response = await axios.post(url, payload);
            handleLogin(response.data);
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="signup-area">
            <Message
                attached
                icon="settings"
                header="Get Started"
                content="Create a new account"
                color="green"
            />

            <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
                <Message
                    error
                    header="Oops!"
                    content={error}
                />

                <Segment>
                    <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        label="Name"
                        placeholder="Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />

                    <Form.Input
                        fluid
                        icon="envelope"
                        iconPosition="left"
                        label="Email"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                    />

                    <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                    />

                    <Button
                        icon="signup"
                        type="submit"
                        content="Signup Now"
                        color="green"
                        disabled={disabled || loading}
                    />
                </Segment>
            </Form>
            
            <Message attached="bottom" warning>
                <Icon name="help" />
                Existing user?{" "}
                <Link href="/auth/login">
                    <a>Login here</a>
                </Link>{" "}instead.
            </Message>
        </div>
    );
}

export default Signup;
