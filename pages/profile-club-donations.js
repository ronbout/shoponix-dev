import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
import states from "../utils/states.json";

const ProfileClubDonations = ({ user }) => {
  const router = useRouter();
  const [clubFees, setClubFees] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [feePeriod, setFeePeriod] = useState("month");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalFees, setTotalFees] = useState(50);

  useEffect(() => {
    const isClubFees = Object.values(clubFees).every((el) => Boolean(el));
    isClubFees ? setDisabled(false) : setDisabled(true);
  }, [clubFees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubFees((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFeePeriodChange = (period) => {
    feePeriod !== period && setFeePeriod(period);
    "month" === period ? setTotalFees(50) : setTotalFees(550);
  };

  const handleStateSelect = (e, selectInfo) => {
    console.log(selectInfo);
    console.log(e.target);
    console.log(e.target.value);
  };

  const buildStatesDropdown = () => {
    const stateOptions = states.map((stateInfo) => {
      return (
        <option value={stateInfo.abbreviation} key={stateInfo.abbreviation}>
          {stateInfo.name}
        </option>
      );
    });
    return (
      <select value={clubFees.state} onChange={handleChange} name="state">
        {stateOptions}
      </select>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      alert("stripe payment");
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  const currency = (n, digits = 2) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: digits,
    }).format(n);
  };

  return (
    <Container className="club-fees-container">
      <div>
        <h1>How would you like to pay?</h1>
      </div>
      <div className="club-fees-form-container">
        <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
          <Message error header="Oops!" content={error} />
          <div className="fee-checks">
            <div className="period-check">
              <label htmlFor="pay-monthly-check">Pay Monthly: $50/month</label>
              <input
                type="checkbox"
                id="pay-monthly-check"
                checked={"month" === feePeriod}
                onChange={() => handleFeePeriodChange("month")}
              />
            </div>
            <div className="period-check">
              <label htmlFor="pay-yearly-check">Pay Yearly: $550/year</label>
              <input
                type="checkbox"
                id="pay-yearly-check"
                checked={"month" !== feePeriod}
                onChange={() => handleFeePeriodChange("year")}
              />
            </div>
          </div>
          <section className="fee-fields">
            <div className="left-div">
              <h4>Billing Address</h4>
              <Segment>
                <Form.Input
                  fluid
                  label="Address Line 1"
                  name="address1"
                  type="text"
                  value={clubFees.address1}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  label="Address Line 2"
                  name="address2"
                  type="text"
                  value={clubFees.address2}
                  onChange={handleChange}
                />
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="City"
                    name="city"
                    type="text"
                    value={clubFees.city}
                    onChange={handleChange}
                  />
                  {buildStatesDropdown()}
                </Form.Group>
                <Form.Input
                  fluid
                  label="ZIP Code"
                  name="zipcode"
                  type="text"
                  value={clubFees.address2}
                  onChange={handleChange}
                />
              </Segment>
            </div>
            <div className="right-div">
              <h4>Order items</h4>
              <Segment>
                <div className="member-container">
                  <div>
                    <Image src="/images/mo_bag.png" width={127} height={137} />
                  </div>
                  <div>
                    <h5>Moshoppa Membership</h5>
                    <div style={{ textAlign: "right" }}>
                      <span>{currency(totalFees, 0)}</span>
                      <br />
                      <p>Charged Monthly</p>
                    </div>
                  </div>
                </div>
                <hr />
                <br />
                <div className="club-fees-totals">
                  <h4>Sub-Total</h4>
                  <span id="sub-total">{currency(totalFees)}</span>
                </div>
                <div className="club-fees-totals">
                  <h4>Shipping</h4>
                  <span id="sub-total">$0.00</span>
                </div>
                <div className="club-fees-totals">
                  <h4>Total</h4>
                  <span id="sub-total">{currency(totalFees)}</span>
                </div>
                <hr />
                <div style={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    content="Pay Now"
                    color="blue"
                    disabled={false && (disabled || loading)}
                  />
                </div>
              </Segment>
            </div>
          </section>
        </Form>
      </div>
    </Container>
  );
};

export default ProfileClubDonations;
