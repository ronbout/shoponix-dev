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

const ProfileClubDetails = ({ user }) => {
  const router = useRouter();
  const [clubDetails, setClubDetails] = useState({
    clubPass: "",
    clubName: "", // ***** get from user!!
    clubSize: "",
    clubSeasonDates: "",
    clubGoalDates: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      alert("Donation information saved");
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
                  name="clubName"
                  type="text"
                  value={clubDetails.clubName}
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

export default ProfileClubDetails;
