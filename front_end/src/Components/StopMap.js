import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
// import CreateStopPage from "../Pages/CreateStopPage";

const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });
    let [marker, setMarker] = useState([]);

    if (!isLoaded) return <div>Loading...</div>
    return ( 
        <div>
            <GoogleMap 
                zoom={10} 
                center={{lat:37.2982, lng: -113.0263}} 
                mapContainerClassName="map-container"
                // onClick={(e) => {
                //     setMarker({
                //         lat: e.latLng.lat(),
                //         lng: e.latLng.lng()
                //     });
                //     console.log(marker);
                //     console.log(marker.lat, marker.lng);
                // }}
                onClick={(e) => {
                    marker = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()};
                    setMarker(marker);
                    console.log(marker);
                }}
            >
                <MarkerF position={{ lat: marker.lat, lng: marker.lng }} />
            </GoogleMap>
            {/* <CreateStopPage stop_lat={marker.lat} stop_lng={marker.lng} /> */}
        </div>
    );
}
 
export default Map;


