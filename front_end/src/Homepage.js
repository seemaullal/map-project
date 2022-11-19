// passing in e as a param shows a bunch of attributes
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import StopList from './StopList';

const Homepage = () => {
    const [name, setName] = useState('Brooke');
    const [age, setAge] = useState(26);

    const handleClick = () => {
        setName('Rox');
        setAge(31);
        console.log('Click function has been triggered')
    }
// spots is a property
    const [stops, setStops] = useState([
        { name: 'Yosemite Trail', user: 'Rox', id: 1 },
        { name: 'Umpqua Hot Spring', user: 'Brooke', id: 2 },
        { name: 'Vista Point', user: 'Brooke', id: 3 },
        { name: 'Japanese Tea Garden', user: 'Brooke', id: 4 }
    ])

    const [user, setUser] = useState('Brooke');

    const handleDelete = (id) => {
        //doesn't change original data, just updates and saves as new variable
        const newStops = stops.filter(stop => stop.id !== id);
        setStops(newStops);
    }
    // useEffect runs when page first loads and when data changes
    useEffect(() => {
        console.log('use effect')
        console.log(user)
    }, [user]);
    //user is a dependency and when it changes, this function runs
    //when deleting things, this wont run bc its not a dependency
    //only dependencies change with this!
    return ( 
        <div className="homepage">
            <h2>Homepage</h2>  
            <div className="links">
                <Link to="/login">Login</Link> <br />
                <Link to="/create-account">Create Account</Link>
            </div>
            <p>{ name } is { age } years old</p>
            <button onClick={handleClick}>Click Me</button>

            <StopList stops={stops} title="All Stops" handleDelete={handleDelete} />
            <StopList stops={stops.filter((stop) => stop.user === 'Brooke')} title="Brooke's Stops" />
            <button onClick={() => setUser('Bella')}>change user's name</button>
            <p>{ user }</p>
        </div>
     );
}
 
export default Homepage;