import React from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../../utils/catchErrors';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import { handleLogin } from '../../utils/auth';

const INITIAL_USER = {
    email: '',
    password: ''
};

const Login = () => {
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
            const url = `${baseUrl}/api/login`;
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
        <div className="login-area">
            <Message
                attached
                icon="privacy"
                header="Welcome Back!"
                content="Login with email and password"
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
                        icon="sign-in"
                        type="submit"
                        content="Login Now"
                        color="green"
                        disabled={disabled || loading}
                    />
                </Segment>
            </Form>
            
            <Message attached="bottom" warning>
                <Icon name="help" />
                Not an account?{" "}
                <Link href="/auth/signup">
                    <a>Signup here</a>
                </Link>{" "}instead.
            </Message>
        </div>
    );
}

export default Login;
