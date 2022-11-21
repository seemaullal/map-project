import { Link } from 'react-router-dom';

const ProfilePage = (props) => {
    // const { users } = props;
    // console.log(props)

    return ( 
        <div className="ProfilePage">
            <h2>My Profile</h2>
            {/* <p>{users}</p> */}
            <Link to="/create-stop">Create a Stop</Link>
        </div>
     );
}
 
export default ProfilePage;

