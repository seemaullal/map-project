import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    if (!isLoaded) return <div>Loading...</div>
    return ( 
        <div>
            <GoogleMap 
                zoom={10} 
                center={{lat:37.2982, lng: -113.0263}} 
                mapContainerClassName="map-container"
            >
                <MarkerF position={{lat:37.2982, lng: -113.0263}} />
            </GoogleMap>
        </div>
    );
}
 
export default Map;