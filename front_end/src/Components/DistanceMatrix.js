import { DistanceMatrixService } from "@react-google-maps/api";

const DistanceMatrix = ({ isLoaded, start, end }) => {
    console.log(start);
    console.log(end);

    const start_lat = 38.889248;
    const start_lng = -77.050636;
    const end_lat = 40.71427;
    const end_lng = -74.00597;

    const requestOptions = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
        },
    }

    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington%2C%20DC&destinations=New%20York%20City%2C%20NY&units=imperial&key=X`, requestOptions)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })


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
                    console.log(modResponse);
                }}
            />
        </div>
    );
};

export default DistanceMatrix;