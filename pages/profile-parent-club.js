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

const ProfileParentClub = ({ user, parentInfo, clubs }) => {
  const router = useRouter();
  const [parentClub, setParentClub] = useState({
    clubPass: "",
    clubId: parentInfo.clubId ? parentInfo.clubId : "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("clubs: ", clubs);

  const parentId = user.parent.id;
  const parentFirstName = user.parent.firstname;
  const parentLastName = user.parent.lastname;

  useEffect(() => {
    const isParentClub = Object.values(parentClub).every((el) => Boolean(el));
    isParentClub ? setDisabled(false) : setDisabled(true);
  }, [parentClub]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ("clubPass" === name) {
      const matchClub = clubs.find((club) => {
        return club.clubPass === value;
      });
      if (matchClub) {
        setParentClub((prevState) => ({
          clubPass: value,
          clubId: matchClub.id,
        }));
        return;
      }
    }
    setParentClub((prevState) => ({ ...prevState, [name]: value }));
  };

  const buildClubsDropdown = (cPass) => {
    let selectClubs = clubs;
    if (cPass) {
      const matchClub = clubs.find((club) => {
        return club.clubPass === cPass;
      });
      if (matchClub) {
        selectClubs = [matchClub];
      }
    }
    const clubOptions = selectClubs.map((clubInfo) => {
      return (
        <option value={clubInfo.id} key={clubInfo.id}>
          {clubInfo.clubname}
        </option>
      );
    });
    return (
      <select
        value={parentClub.clubId}
        onChange={handleChange}
        name="clubId"
        id="club-selection"
      >
        {clubOptions}
      </select>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const url = `${baseUrl}/api/parent/${parentId}`;
      const payload = { clubId: parentClub.clubId };
      const response = await axios.put(url, payload);

      console.log(response.data);
      Router.push("/profile-parent-details");
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="parent-club-container">
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
                    placeholder="SHOULD THIS BE USED TO SELECT CLUB BELOW??"
                    value={parentClub.clubPass}
                    onChange={handleChange}
                  />
                  <Image src="/images/soccer_com.png" width={185} height={16} />
                </div>
              </div>
              <div style={{ textAlign: "left", marginTop: "36px" }}>
                <h2>Club Information</h2>
                <label htmlFor="club-selection">Club Name</label>
                {buildClubsDropdown(parentClub.clubPass)}
              </div>
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

ProfileParentClub.getInitialProps = async (ctx) => {
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

  const clubsUrl = `${baseUrl}/api/club`;
  const clubsResponse = await axios.get(clubsUrl);

  // return response data as an object
  // return { ...parentResponse.data, ...clubsResponse.data };
  return { ...parentResponse.data, ...clubsResponse.data };
  // note: this object will be merge with existing props
};

export default ProfileParentClub;
