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

const ProfileClubDonations = ({ user, clubInfo }) => {
  const router = useRouter();
  const [donations, setDonations] = useState({
    bankAccountName: clubInfo.bankAccountName ? clubInfo.bankAccountName : "",
    bankIBAN: clubInfo.bankIBAN ? clubInfo.bankIBAN : "",
    bankBIC: clubInfo.bankBIC ? clubInfo.bankBIC : "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clubId = user.club.id;
  const clubName = user.club.clubname;

  useEffect(() => {
    const isdonations = Object.values(donations).every((el) => Boolean(el));
    isdonations ? setDisabled(false) : setDisabled(true);
  }, [donations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonations((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const url = `${baseUrl}/api/club/${clubId}`;
      const payload = { ...donations };
      const response = await axios.put(url, payload);

      console.log(response.data);
      Router.push("/profile-club-details");
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="club-donations-container">
      <div>
        <h1>Where will we send your donations?</h1>
      </div>
      <div className="club-fees-form-container">
        <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
          <Message error header="Oops!" content={error} />
          <Segment>
            <section className="fee-fields">
              <div className="left-div">
                <h4>Account Details</h4>
                <Form.Input
                  fluid
                  label="Account Name"
                  name="bankAccountName"
                  type="text"
                  value={donations.bankAccountName}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  label="IBAN"
                  name="bankIBAN"
                  type="text"
                  value={donations.bankIBAN}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  label="BIC"
                  name="bankBIC"
                  type="text"
                  value={donations.bankBIC}
                  onChange={handleChange}
                />
              </div>
              <div className="right-div" style={{ marginLeft: "48px" }}>
                <div className="member-container">
                  <div>
                    <Image src="/images/mo_bag.png" width={250} height={270} />
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    content="Confirm"
                    color="blue"
                    disabled={false && (disabled || loading)}
                  />
                </div>
              </div>
            </section>
          </Segment>
        </Form>
      </div>
    </Container>
  );
};

ProfileClubDonations.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
  /***
   *
   *  TODO:  	if no club id redirect somewhere
   *
   */
  // // fetch data on server
  const url = `${baseUrl}/api/club/${tokenInfo.clubId}`;
  const response = await axios.get(url);
  // console.log("response: ", response.data);
  // return response data as an object
  return response.data;
  // note: this object will be merge with existing props
};

export default ProfileClubDonations;
