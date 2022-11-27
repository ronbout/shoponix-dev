import { Container, Icon } from 'semantic-ui-react';
import Gravatar from 'react-gravatar';
import formatDate from '../../utils/formatDate';

const ProfileHeader = ({ role, email, name, createdAt }) => {
    return (
        <>
            <Container>
                <div className="profile-root-user">
                    <div className="profile-image">
                        {/* Image recommended size 200x200  */}
                        {/* <img src="/images/profile.jpg" /> */}
                        <Gravatar email={email} size={100} rating="pg" default="monsterid" />
                        {/* <img src="/images/default-profile.jpg" /> */}

                        <button onClick={() => window.open('https://en.gravatar.com/', '_blank')} className="upload" title="Upload Image">
                            <Icon name='camera' />
                        </button>
                    </div>

                    <h3>{name}</h3>
                    <p>{email}</p>
                    <p>Joined: {formatDate(createdAt)}</p>
                    <p>Role: {role === 'user' ? 'Customer' : role}</p>
                </div>
            </Container>
        </>
    );
}

export default ProfileHeader;
