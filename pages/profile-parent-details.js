import { useState, useEffect } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { parseCookies } from "nookies";
import {
  Button,
  Dropdown,
  Form,
  Icon,
  Message,
  Segment,
  Container,
} from "semantic-ui-react";
import catchErrors from "../utils/catchErrors";
import baseUrl from "../utils/baseUrl";

const ProfileParentDetails = ({ user, parentInfo }) => {
  const router = useRouter();
  const [parentDetails, setParentDetails] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    relation: parentInfo.relation ? parentInfo.relation : "",
    birthday: parentInfo.birthday ? parentInfo.birthday : "",
    email: user.email,
    phone: user.phone ? user.phone : "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const parentId = user.parent.id;

  useEffect(() => {
    const isParentDetails = Object.values(parentDetails).every((el) =>
      Boolean(el)
    );
    isParentDetails ? setDisabled(false) : setDisabled(true);
  }, [parentDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParentDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const buildRelationsDropdown = () => {
    const parentRoles = ["Mom", "Dad", "Other"];

    const relationOptions = parentRoles.map((role) => {
      return (
        <option value={role} key={role}>
          {role}
        </option>
      );
    });

    return (
      <select
        value={parentDetails.relation}
        onChange={handleChange}
        name="relation"
        id="relation-selection"
      >
        <option value="" disabled>
          Pick one!
        </option>
        {relationOptions}
      </select>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const url = `${baseUrl}/api/parent/${parentId}`;
      const payload = { ...parentDetails };
      const response = await axios.put(url, payload);

      console.log(response.data);
      const clubname = response.data.parentInfo.club.clubname;
      Router.push(`/club/${clubname}`);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="parent-details-container">
      <div>
        <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
          <Message error header="Oops!" content={error} />
          <Segment>
            <section>
              <h2>Tell us about yourself!</h2>
              <h3>
                We're here to support the parents who support soccer's future
                starts.
              </h3>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="First Name"
                      name="firstname"
                      value={parentDetails.firstname}
                      onChange={handleChange}
                      required={true}
                    />
                    <Form.Input
                      fluid
                      label="Last Name"
                      name="lastname"
                      value={parentDetails.lastname}
                      onChange={handleChange}
                      required={true}
                    />
                  </Form.Group>
                </div>
                <div style={{ display: "flex", marginBottom: "16px" }}>
                  <div style={{ width: "50%", paddingRight: "12px" }}>
                    <label htmlFor="relation-selection">I'm a...</label>
                    {buildRelationsDropdown()}
                  </div>
                  <div style={{ width: "50%" }}>
                    <label htmlFor="birthday">Birthday</label>
                    <input
                      type="date"
                      name="birthday"
                      id="birthday"
                      placeholder="Because you should get gifts too!"
                      value={parentDetails.birthday}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Email"
                  name="email"
                  value={parentDetails.email}
                  onChange={handleChange}
                  required={true}
                />
                <Form.Input
                  fluid
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={parentDetails.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <div style={{ textAlign: "right", marginTop: "24px" }}>
                <Button
                  type="submit"
                  content="Update"
                  color="blue"
                  disabled={false && (disabled || loading)}
                />
              </div>
            </section>
          </Segment>
        </Form>
      </div>
    </Container>
  );
};

ProfileParentDetails.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
  /***
   *
   *  TODO:  	if no parent id redirect somewhere
   *
   */
  // // fetch data on server
  const parentUrl = `${baseUrl}/api/parent/${tokenInfo.parentId}`;
  const parentResponse = await axios.get(parentUrl);

  return parentResponse.data;
  // note: this object will be merge with existing props
};

export default ProfileParentDetails;
