import RouteMap from "../Components/RouteMap.js";
import { useState } from "react";

const CreateRoutePage = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            user_id: sessionStorage.user_id,
            start_lat: inputs.start_lat,
            start_lng: inputs.start_lng,
            end_lat: inputs.end_lat,
            end_lng: inputs.end_lng
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch('/create-route', requestOptions)
            .then(response => response.json())
            .then((data) => {
                const route_id= data.route_id;
            })
            .catch(error => console.log(error))

        
        console.log('handleSubmit triggered');
    }

    return ( 
        <div className="CreateRoutePage">
            <div className="CreateRouteContent">
            <h2>Create a Route</h2>
            </div>
            <form className='CreateRouteForm'>
                <label>Starting Point:</label>
                <input 
                    type='text' 
                    required 
                    name='start_lat' 
                    value={inputs.start_lat || ''}
                    onChange={handleChange}
                />
                <label>Final Destination:</label>
                <input 
                    type='text' 
                    required 
                    name='end_lat' 
                    value={inputs.end_lat || ''}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Create Route</button>
            </form>
            <div className="MapContent">
                <RouteMap />
            </div>
        </div>
    );
}
 
export default CreateRoutePage;

