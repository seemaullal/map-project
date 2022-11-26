// type sfc tab to get the following skeleton/stateless functional component
//shift option down to duplicate a line
// line 12-16 shows inline styling, a dynamic value (JS object) w/ key/value pairs

import { Link } from 'react-router-dom';


const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>The Roadtrip App</h1>
            <div className="links">
                <Link to="/">Homepage</Link>
                <Link to="/all-stops">All Stops</Link>
                <Link to="/profile" style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px"
                }}>My Profile</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;

