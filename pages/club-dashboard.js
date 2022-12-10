import { Container } from "semantic-ui-react";

const ClubDashboard = ({ user }) => {
  console.log(user);
  return (
    <Container>
      <h1>{user.club?.clubname} Dashboard</h1>
    </Container>
  );
};

export default ClubDashboard;
