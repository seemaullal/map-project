import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";


export default function CreateStopPage ({ stop_lat, stop_lng }) {
    const [libraries] = useState(['places']);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    let [catChoice, setCatChoice] = useState("");
    let [marker, setMarker] = useState([]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            user_id: sessionStorage.user_id,
            stop_category: catChoice,
            stop_name: inputs.stop_name,
            stop_lat: marker.lat,
            stop_lng: marker.lng,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch('/create-stop', requestOptions)
            .then(response => response.json())
            .then((data) => {
                const stop_id= data.stop_id;
                navigate(`/stops/${stop_id}`); 
            })
            .catch(error => console.log(error))

        
        console.log('handleSubmit triggered');
        console.log(inputs);
        console.log(body);
    }

    if (!isLoaded) return <div>Loading...</div>
    return ( 
        <div className="CreateStopPage" onSubmit={handleSubmit}>
            <h2>Create A Stop</h2>
            <p>Click the map to drop a pin at approximate location of your stop.</p>
            <div className="MapContent">
                <GoogleMap 
                    zoom={10} 
                    center={{lat: 39.828856, lng: -98.577291}} 
                    mapContainerClassName="map-container"
                    onClick={(e) => {
                        marker = {
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng()};
                        setMarker(marker);
                        console.log(marker);
                    }}
                >
                    {marker.lat ? (<MarkerF position={{ lat: marker.lat, lng: marker.lng }} />) : null}
                </GoogleMap>
            </div>
            <form className="CreateStopForm">
                <label>Stop Name:</label>
                <input 
                    type="text" 
                    required 
                    name="stop_name"
                    value={inputs.stop_name || ""}
                    onChange={handleChange}
                />
                <label>Latitude:</label>
                <input 
                    type="text" 
                    required 
                    name="stop_lat"
                    value={marker.lat || ""}
                    onChange={handleChange} 
                />
                <label>Longitude:</label>
                <input 
                    type="text"
                    required 
                    name="stop_lng" 
                    value={marker.lng || ""}
                    onChange={handleChange}
                />
                <label>Select a Stop Category:</label>
                <select 
                    name="stop_category" 
                    id="stop-category-select" 
                    value={catChoice} 
                    onChange={(e) => {
                        catChoice = e.target.value;
                        setCatChoice(catChoice);
                        console.log(catChoice);
                    }}
                >
                    <option value="camping" aria-selected>Camping</option>
                    <option value="caverns">Caverns</option>
                    <option value="climbing-access/scrambling">Climbing Access/Scrambling</option>
                    <option value="hiking">Hiking</option>
                    <option value="national-monument">National Monument</option>
                    <option value="national-park">National Park</option>
                    <option value="picnic-area">Picnic Area</option>
                    <option value="state-park">State Park</option>
                    <option value="swimming-hole">Swimming Hole</option>
                    <option value="unique-find">Unique Find</option>
                    <option value="view-point">View Point</option>
                    <option value="water-access">Water Access</option>
                </select>
                <button>Create Stop</button>
            </form>
        </div>
     );
}
 
