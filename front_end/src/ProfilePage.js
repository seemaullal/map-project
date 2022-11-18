const ProfilePage = (props) => {
    const { users } = props;
    console.log(props)

    return ( 
        <div className="ProfilePage">
            <h2>My Profile</h2>
            <p>{users}</p>
        </div>
     );
}
 
export default ProfilePage;

