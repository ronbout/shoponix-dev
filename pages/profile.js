import ProfileHeader from "../components/Profile/ProfileHeader"

const Profile = ({ user }) => {
    return (
        <>
            <div className="profile-area">
                <ProfileHeader {...user} />
            </div>
        </>
    );
}

export default Profile;
