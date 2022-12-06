import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";

const ClubHome = (props) => {
  const router = useRouter();
  const club = {
    name: router.query.clubname,
  };

  return (
    <Container className="container">
      <h1>{club.name} home page</h1>
    </Container>
  );
};

export default ClubHome;
