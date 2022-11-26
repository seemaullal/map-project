import { useEffect, useState } from 'react'

const AllStopsPage = () => {
    // or access props by passing in props above then the next two lines
    // const stops = props.stops;
    // const title = props.title;
    const [stops, setStops] = useState("");

    // stopInfoList= []
    const requestOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    }

    fetch('/api/stops', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

    // for (const stop of Object.values()) {
    //     const stopInfo = (
    //         <StopInfo 
    //         name="name"
    //         submittedBy="user"
    //         lat="lat"
    //         lng="lng"
    //         />
    //     );
    //     stopInfo.push(stopInfoList);
    // }


    return (
        <div className="stop-list">
            {/* <h2>{ title }</h2>
            {stops.map((stop) => (
                 <div className="stop-preview" key={stop.id}>
                    <h2>{ stop.name }</h2>
                    <p>Created by { stop.user }</p>
                    <button onClick={() => handleDelete(stop.id)}>Delete Stop</button>
                </div>
            ))} */}
            <p>A list of stops!</p>
        </div>
    );
}
 
export default AllStopsPage;