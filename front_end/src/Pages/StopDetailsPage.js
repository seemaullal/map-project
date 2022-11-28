import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StopDetails = () => {
    let { stop_id } = useParams(); 
    const [stop, setStop] = useState([]); 

    useEffect(() => {
        fetch(`/api/stops/${stop_id}`) 
            .then(response => response.json())
            .then(data => {setStop(data)}) 
            .catch(error => console.log(error));
    }, [stop_id]); 

    console.log(stop)

    return ( 
        <div className="StopPage">
            <article>
                <h2>{ stop.stop_name }</h2>
                <p>Stop Category: { stop.stop_category }</p>
                <p>Stop Latitude: { stop.stop_lat }</p>
                <p>Stop Longitude: { stop.stop_lng }</p>
            </article>
        </div>
     );
}
 
export default StopDetails;