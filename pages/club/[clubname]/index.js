import { useRouter } from "next/router";
import { Container, Embed } from "semantic-ui-react";

const ClubHome = (props) => {
  const router = useRouter();
  const club = {
    name: router.query.clubname,
  };

  return (
    <Container
      className="container"
      style={{ width: "800px", margin: "24px auto", textAlign: "center" }}
    >
      <div>
        <h1>{club.name} Club Page</h1>
        <Embed
          // id="3fSX8BFmeDw"
          id="l81u-oSIAp4"
          // placeholder="/images/niall_vid.jpg"
          placeholder="/images/zombie.jpg"
          source="youtube"
        />
      </div>
      <section style={{ marginTop: "36px" }}>
        <h2>Parent Wallet info</h2>
      </section>
    </Container>
  );
};

export default ClubHome;
