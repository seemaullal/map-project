import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import DistanceMatrix from "./DistanceMatrix";

const RouteMap = () => {
    const [mapData, setMapData] =useState([]);
    const [selected, setSelected] = useState(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });
   
    useEffect(() => {
        fetch('/api/stops/map_data')
            .then((response) => response.json())
            .then((data) => {
                setMapData(data);
            });
    }, []);

    const stopsObj = Object.entries(mapData).map(([key, value]) => ({key, value}));
    console.log(stopsObj);

    if (!isLoaded) return <div>Loading...</div>
    return ( 
        <div>
            <GoogleMap 
                zoom={10} 
                center={{lat:37.2982, lng: -113.0263}} 
                mapContainerClassName="map-container"
            >
                {stopsObj.map((stopObj) => (
                    <MarkerF  
                        key={stopObj.key}
                        position={{ lat: stopObj.value.stop_lat, lng: stopObj.value.stop_lng}} 
                        onClick={() => {
                            setSelected(stopObj);
                        }}
                    />
                    
                ))}
                {selected ? (<InfoWindowF
                                position={{ lat: selected.value.stop_lat, lng: selected.value.stop_lng }} 
                                onCloseClick={() => {
                                    setSelected(null);
                                }}
                            >
                                <div>
                                    <h2>{selected.value.stop_name}</h2>
                                    <p>Category: {selected.value.stop_category}</p>
                                </div>
                            </InfoWindowF>) : null}
            </GoogleMap>
            <DistanceMatrix isLoaded={isLoaded}/>
        </div>
    );
}
 
export default RouteMap;
