import { useEffect, useState } from 'react'
import StopList from './StopList.js'

// import DataFetching from '../Components/DataFetching';

const AllStopsPage = () => {

    const [stops, setStops] = useState([]);
    
    useEffect(() => {
        fetch('/api/stops')
            .then(response => response.json())
            .then(data => {setStops(data)})
            .catch(error => console.log(error));
    }, []);

    const obj = Object.entries(stops).map(([key, value]) => ({key, value}))

    console.log(obj)

    return (
        <div className="stop-list">
            {obj && <StopList obj={obj} title="All Stops" />}
            {/* <ul>
                {obj.map(obj => (
                   <li key={obj.key}>{obj.value.stop_name}</li>
                ))}
            </ul> */}
        </div>
    );
}

  
 
export default AllStopsPage;