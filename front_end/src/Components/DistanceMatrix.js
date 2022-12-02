import { useLoadScript, DistanceMatrixService, LoadScript } from "@react-google-maps/api";

const DistanceMatrix = ({ start, end }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });
    console.log(start);
    console.log(end);

    const start_lat = 38.889248;
    const start_lng = -77.050636;
    const end_lat = 40.71427;
    const end_lng = -74.00597;


    if (!isLoaded) return <div>Loading...</div>
    return (
        <div>
            <p>Hi! {start}, {end}</p>
            <DistanceMatrixService
                options={{
                        destinations: [{lat: end_lat, lng: end_lng}],
                        origins: [{lng: start_lat, lat: start_lng}],
                        travelMode: "DRIVING",
                        }}
                callback = {(response, status) => {
                    const modResponse = {
                        destination_addresses: response.destinationAddresses[0],
                        origin_addresses: response.originAddresses[0],
                    };
                    console.log(response);
                }}
            />

           
        </div>
        
    );
};

export default DistanceMatrix;