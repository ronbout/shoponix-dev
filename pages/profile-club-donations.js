import { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
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
import currency from "../utils/currency";
import states from "../utils/states.json";

const ProfileClubDonations = ({ user }) => {
  const router = useRouter();
  const [donations, setDonations] = useState({
    accountName: "",
    bankIBAN: "",
    bankBIC: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      alert("Donation information saved");
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
                  name="accountName"
                  type="text"
                  value={donations.accountName}
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

export default ProfileClubDonations;
