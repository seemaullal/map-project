import { Link } from 'react-router-dom';
// import StopList from '../Components/StopList.js'

const ProfilePage = ({ obj }) => {

    console.log(obj)
   


    return ( 
        <div className="ProfilePage">
            <h2>My Profile</h2>
            <Link to="/create-stop">Create a Stop</Link>
            {/* {obj && <StopList obj={obj} title="All Stops" />} */}
        </div>
     );
}
 
export default ProfilePage;

