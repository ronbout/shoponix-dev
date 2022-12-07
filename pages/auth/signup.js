import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import {
  Button,
  Form,
  Icon,
  Message,
  Segment,
  Container,
} from "semantic-ui-react";
import catchErrors from "../../utils/catchErrors";
import baseUrl from "../../utils/baseUrl";
import { handleLogin } from "../../utils/auth";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    ...("club" === router.query.type && { clubname: "" }),
    email: "",
    password: "",
    password2: "",
    userType: router.query.type,
  });
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let userTypeDisp;
  if ("club" === user.userType) {
    userTypeDisp = "Club";
  } else {
    userTypeDisp = "Parent";
  }

  // console.log("userType ", user.userType);

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckShowPass = (e) => {
    setShowPass(!showPass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      console.log("sign up return: ", response.data);
      handleLogin(response.data, user.userType, true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="signup-container">
      <div>
        <h2>Create a {userTypeDisp} account</h2>
        <p>
          Already have an account?
          <Link href="/auth/login"> Log in</Link>
        </p>
      </div>
      <div className="ui grid">
        <div className="ten wide column signup-form">
          <Form
            error={Boolean(error)}
            loading={loading}
            onSubmit={handleSubmit}
          >
            <Message error header="Oops!" content={error} />

            <Segment>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="First Name"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  label="Last Name"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleChange}
                />
              </Form.Group>
              {"club" === user.userType ? (
                <Form.Input
                  fluid
                  label="Club Name"
                  name="clubname"
                  type="text"
                  value={user.clubname}
                  onChange={handleChange}
                />
              ) : (
                ""
              )}

              <Form.Input
                fluid
                label="Email Address"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
              />

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={user.password}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  label="Confirm your password"
                  name="password2"
                  type={showPass ? "text" : "password"}
                  value={user.password2}
                  onChange={handleChange}
                />
              </Form.Group>
              <p>
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>

              <Form.Checkbox
                label="Show Password"
                checked={showPass}
                onChange={handleCheckShowPass}
              />

              <div className="ui grid" style={{ marginTop: "24px" }}>
                <div className="four wide column">
                  <Link href="/auth/login">
                    <a>Log in instead</a>
                  </Link>
                </div>
                <div className="ten wide column">
                  <Button
                    type="submit"
                    content="Create an Account"
                    color="blue"
                    disabled={disabled || loading}
                  />
                </div>
              </div>
            </Segment>
          </Form>
        </div>
        <div className="six wide column">
          <Image src="/images/soccer_player.png" width={279} height={440} />
        </div>
      </div>
    </Container>
  );
};

export default Signup;
