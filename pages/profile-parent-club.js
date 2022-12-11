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

const ProfileParentClub = ({ user, clubInfo }) => {
  const router = useRouter();
  const [clubDetails, setClubDetails] = useState({
    clubPass: clubInfo.clubPass ? clubInfo.clubPass : "",
    clubname: clubInfo.clubname ? clubInfo.clubname : "",
    clubSize: clubInfo.clubSize ? clubInfo.clubSize : "",
    clubSeasonDates: clubInfo.clubSeasonDates ? clubInfo.clubSeasonDates : "",
    clubGoalDates: clubInfo.clubGoalDates ? clubInfo.clubGoalDates : "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clubId = user.club.id;
  const clubname = user.club.clubname;

  useEffect(() => {
    const isclubDetails = Object.values(clubDetails).every((el) => Boolean(el));
    isclubDetails ? setDisabled(false) : setDisabled(true);
  }, [clubDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const url = `${baseUrl}/api/club/${clubId}`;
      const payload = { ...clubDetails };
      const response = await axios.put(url, payload);

      console.log(response.data);
      Router.push("/club-dashboard");
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="club-details-container">
      <div>
        <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
          <Message error header="Oops!" content={error} />
          <Segment>
            <section className="soccer-pass-container">
              <h2>Enter the club's Soccer.com pass</h2>
              <div style={{ display: "flex" }}>
                <div style={{ textAlign: "left", width: "80%" }}>
                  <Form.Input
                    fluid
                    label="Club Pass"
                    name="clubPass"
                    type="text"
                    value={clubDetails.clubpass}
                    onChange={handleChange}
                  />
                  <Image src="/images/soccer_com.png" width={185} height={16} />
                  <div style={{ marginTop: "142px" }}>
                    <h2>Enter your club details</h2>
                    <p style={{ fontWeight: "400" }}>
                      Club isn't recognized on Soccer.com? Not a problem.
                      Moshoppa is here for everyone!
                    </p>
                  </div>
                </div>
                <div>
                  <Image
                    src="/images/standing_guy.png"
                    width={162}
                    height={354}
                  />
                </div>
              </div>
            </section>
            <section className="soccer-details-container">
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Club Name"
                  name="clubname"
                  type="text"
                  value={clubDetails.clubname}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  label="Club Size"
                  name="clubSize"
                  type="text"
                  value={clubDetails.clubSize}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Club Season Dates"
                  name="clubSeasonDates"
                  type="text"
                  value={clubDetails.clubSeasonDates}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  label="Fundraising Goal Dates"
                  name="clubGoalDates"
                  type="text"
                  value={clubDetails.clubGoalDates}
                  onChange={handleChange}
                />
              </Form.Group>
              <div style={{ textAlign: "right" }}>
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

ProfileParentClub.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
  /***
   *
   *  TODO:  	if no parent id redirect somewhere
   *
   */
  // // fetch data on server
  const url = `${baseUrl}/api/parent/${tokenInfo.parentId}`;
  const response = await axios.get(url);
  // console.log("response: ", response.data);
  // return response data as an object
  return response.data;
  // note: this object will be merge with existing props
};

export default ProfileParentClub;
