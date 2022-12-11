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
import currency from "../utils/currency";
import states from "../utils/states.json";

const ProfileClubFees = ({ user, clubInfo }) => {
  const router = useRouter();
  const [clubFees, setClubFees] = useState({
    billAddress: clubInfo.billAddress ? clubInfo.billAddress : "",
    billAddress2: clubInfo.billAddress2 ? clubInfo.billAddress2 : "",
    billCity: clubInfo.billCity ? clubInfo.billCity : "",
    billState: clubInfo.billState ? clubInfo.billState : "",
    billZip: clubInfo.billZip ? clubInfo.billZip : "",
    paid: true,
  });

  const getTotalFees = () => {
    return "monthly" === feePeriod ? 50 : 550;
  };
  const [feePeriod, setFeePeriod] = useState(clubInfo.feePeriod);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalFees, setTotalFees] = useState(getTotalFees());

  const clubId = user.club.id;
  const clubName = user.club.clubname;

  console.log("clubInfo: ", clubInfo);

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
    "monthly" === period ? setTotalFees(50) : setTotalFees(550);
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
      <select
        value={clubFees.billState}
        onChange={handleChange}
        name="billState"
      >
        {stateOptions}
      </select>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const url = `${baseUrl}/api/club/${clubId}`;
      const payload = { feePeriod, ...clubFees };
      const response = await axios.put(url, payload);

      console.log(response.data);

      alert("stripe payment");
      Router.push("/profile-club-donations");
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
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
                checked={"monthly" === feePeriod}
                onChange={() => handleFeePeriodChange("monthly")}
              />
            </div>
            <div className="period-check">
              <label htmlFor="pay-yearly-check">Pay Yearly: $550/year</label>
              <input
                type="checkbox"
                id="pay-yearly-check"
                checked={"monthly" !== feePeriod}
                onChange={() => handleFeePeriodChange("annual")}
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
                  name="billAddress"
                  type="text"
                  value={clubFees.billAddress}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  label="Address Line 2"
                  name="billAddress2"
                  type="text"
                  value={clubFees.billAddress2}
                  onChange={handleChange}
                />
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="City"
                    name="billCity"
                    type="text"
                    value={clubFees.billCity}
                    onChange={handleChange}
                  />
                  {buildStatesDropdown()}
                </Form.Group>
                <Form.Input
                  fluid
                  label="ZIP Code"
                  name="billZip"
                  type="text"
                  value={clubFees.billZip}
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

ProfileClubFees.getInitialProps = async (ctx) => {
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

export default ProfileClubFees;
