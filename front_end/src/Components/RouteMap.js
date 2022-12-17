import { GoogleMap, DirectionsService, DirectionsRenderer, DistanceMatrixService, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { React, useCallback, useEffect, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
  } from "@reach/accordion";
import "@reach/accordion/styles.css";

const center = {
    lat: 37.733795, 
    lng: -122.446747
};
export default function RouteMap () {
    const [libraries] = useState(['places']);
    const [mapData, setMapData] =useState([]);
    const [selected, setSelected] = useState(null);
    const [inputs, setInputs] = useState({});
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries
    });

    useEffect(() => {
        fetch('/api/stops/map_data')
            .then((response) => response.json())
            .then((data) => {
                setMapData(data);
            });
    }, []);

    const stopsObj = Object.entries(mapData).map(([key, value]) => ({key, value}));
    // console.log(stopsObj);

    // const [directionsOptions, setDirectionsOptions] = useState({
    //     response: null,
    //     travelMode: 'DRIVING',
    //     origin: '',
    //     destination: '',
    //     waypoints: []
    // });
    const [directionsOptions, setDirectionsOptions] = useState({
        geocoded_waypoints: [],
        request: {
          destination: {
            query: ''
          },
          origin: {
            query: ''
          },
          travelMode: 'DRIVING',
          waypoints: []
        },
        routes: [],
        status: 'OK'
    });
    // const [directionsOptions, setDirectionsOptions] = useState(null);

    

  function directionsCallback (directionsOptions) {
      // console.log('directionsCallback:', response);
      // console.log('directionsCallback:', response.request);
      // console.log('directionsCallback:', response.request.destination);
      // console.log('directionsCallback:', response.request.destination.query);
      console.log('directionsCallback:', directionsOptions);
      console.log('directionsCallback:', directionsOptions.request);
      console.log('directionsCallback:', directionsOptions.request.destination);
      console.log('directionsCallback:', directionsOptions.request.destination.query);

      // if (response !== null) {
      if (directionsOptions !== null) {
      // if (response.status === 'OK') {
        // {setDirectionsOptions( (prev) => ({...prev, response}));
        // setDirectionsOptions( (prev) => ({...prev, directionsOptions}));
        setDirectionsOptions(() => ({directionsOptions}));
          console.log("directionsOptions:", directionsOptions);
          // console.log("directionsOptions:", response);
      // } else {
      //   console.log('response: ', response);
      // }
    }
  }
  // function distanceMatrixCallback (response) {
  //     // console.log(response);
  //     // console.log(response.request);
  //     // console.log(response.request.destination);

  //   if (response !== null) {
  //     if (response.status === 'OK') {
  //       setDistanceMatrixOptions(() => ({response}));
  //         console.log("distanceMatrixOptions:", distanceMatrixOptions);
  //     } else {
  //       console.log('response: ', response);
  //     }
  //   }
  // }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
    }

  function onClick () {
    if (selected) {
      let selectedWaypoint = {
        location: {
          lat: selected.value.stop_lat,
          lng: selected.value.stop_lng
        },
        stopover: true,
      };
      console.log(selectedWaypoint);
      setDirectionsOptions( (prev) => {
        console.log('prev:', prev.waypoints);
        console.log('prev:', prev.response.waypoints);
        return {
        ...prev,
        waypoints: [...prev.waypoints, selectedWaypoint]
        //  waypoints: [
        //   {
        //     location:  {lat: selected.value.stop_lat, lng: selected.value.stop_lng},
        //     stopover: true,
        //   }]
      }});
    }
    else if (!selected && inputs.origin !== '' && inputs.destination !== '') {
        console.log('ROUTE 1');
        setDirectionsOptions( () => ({
          geocoded_waypoints: [],
          request: {
            destination: {
              query: inputs.destination
            },
            origin: {
              query: inputs.origin

            },
            travelMode: 'DRIVING',
            waypoints: []
          },
          routes: [],
          status: 'OK'
        }));
        console.log("is else if dO:", directionsOptions);
    }

  }

  function onMapClick (...args) {
    console.log('onClick args: ', args);
  }

  if (!isLoaded) return <div>Loading...</div>
    return (
      <div className='map'>
        <div className='map-settings'>
          <hr className='mt-0 mb-3' />

          <div className='row'>
            <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                <label htmlFor='ORIGIN'>Origin</label>
                <br />
                <input 
                    id='ORIGIN' 
                    className='form-control' 
                    type='text' 
                    name='origin'
                    value={inputs.origin || ""}
                    onChange={handleChange}
                />
              </div>
            </div>

            <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                <label htmlFor='DESTINATION'>Destination</label>
                <br />
                <input 
                    id='DESTINATION' 
                    className='form-control' 
                    type='text' 
                    name='destination'
                    value={inputs.destination || ""}
                    onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button className='btn btn-primary' type='button' onClick={onClick}>
            Build Route
          </button>
          {/* {directionsOptions.response !== null && (
              <DirectionsAccordion directionsOptions={directionsOptions}/>
          )} */}
        </div>

        <div className='map-container'>
          <GoogleMap
            id='direction-example'
            mapContainerStyle={{
              height: '400px',
              width: '100%'
            }}
            zoom={10}
            center={center}
            onClick={onMapClick}
          //   onLoad={map => {
          //     console.log('DirectionsRenderer onLoad map: ', map)
          //   }}
          //   onUnmount={map => {
          //     console.log('DirectionsRenderer onUnmount map: ', map)
          //   }}
          >
            {/* {stopsObj.map((stopObj) => (
                <MarkerF  
                    key={stopObj.key}
                    position={{ lat: stopObj.value.stop_lat, lng: stopObj.value.stop_lng}} 
                    onClick={() => {
                        setSelected(stopObj);
                        console.log(stopObj);
                    }}
                    visible={true}
                />
            ))}
            {selected ? (
                            <InfoWindowF
                                selected={selected}
                                position={{ lat: selected.value.stop_lat, lng: selected.value.stop_lng }} 
                                onCloseClick={() => {
                                    setSelected(null);
                                }}
                            >
                                <div>
                                    <h2>{selected.value.stop_name}</h2>
                                    <p>Category: {selected.value.stop_category}</p>
                                    {/* <button onClick={(stobObj) => {addStopToRoute(stopObj)}}>Add to Route</button> */}
                                    {/* <button onClick={onClick}>Add to Route</button>
                                </div>
                            </InfoWindowF>
                        ) : null
            } */} 
        
            {
              (
                directionsOptions.request.destination !== '' &&
                directionsOptions.request.origin !== ''
              ) && (
              // directionsOptions && (
                <DirectionsService
                  options={{ 
                    destination: directionsOptions.request.destination,
                    origin: directionsOptions.request.origin,
                    travelMode: 'DRIVING',
                    waypoints: directionsOptions.request.waypoints
                  }}
                  callback={directionsCallback}
                  onLoad={directionsService => {
                    // console.log('DirectionsService onLoad directionsService: ', directionsService);
                    console.log('DirectionsService:', directionsOptions);
                  }}
                  // onUnmount={directionsService => {
                  //   console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  // }}
                /> 
              )
            }

            {
              (
                directionsOptions.request.destination !== '' &&
                directionsOptions.request.origin !== ''
              ) 
               && (
                <DirectionsRenderer
                  options={{
                    directions: directionsOptions
                  }}
                  onLoad={directionsRenderer => {
                    // console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer);
                    console.log('DirectionsRenderer:', directionsOptions);
                  }}
                  // onUnmount={directionsRenderer => {
                  //   console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  // }}
                />
              )
            }
          </GoogleMap>
        </div>
      </div>
    )
  
}

function DirectionsAccordion ({ directionsOptions }) {
    const origin_address = directionsOptions.response.request.origin.query;
    const destination_address = directionsOptions.response.request.destination.query;
    // const waypoint_coords = directionsOptions.response.request.waypoints[0].location;

    return (
        <div className="DirectionsAccordion">
            <Accordion collapsible multiple>
                <AccordionItem>
                    <h3>
                        <AccordionButton>Origin</AccordionButton>
                    </h3>
                    <AccordionPanel>
                        { origin_address }
                    </AccordionPanel>
                </AccordionItem>
                {/* <AccordionItem>
                    <h3>
                        <AccordionButton>Origin</AccordionButton>
                    </h3>
                    <AccordionPanel>
                        { waypoint_coords }
                    </AccordionPanel>
                </AccordionItem> */}
                <AccordionItem>
                    <h3>
                        <AccordionButton>Destination</AccordionButton>
                    </h3>
                    <AccordionPanel>
                        { destination_address }
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

// Seema and Anika's Edits:

// const [directionsOptions, setDirectionsOptions] = useState({
//   response: null,
//   travelMode: 'DRIVING',
//   origin: '',
//   destination: '',
//   waypoints: {}
// });

// function directionsCallback (response) {
//   // console.log(response);
//   // console.log(response.request);
//   // console.log(response.request.destination);

//   if (response !== null) {
//   if (response.status === 'OK') {
//     setDirectionsOptions((prev) => ({...prev, response}));
//     // setDirectionsOptions(() => ({response}));
//       // console.log("directionsOptions:", directionsOptions);
//     //   console.log(directionsOptions.origin);
//   } else {
//     console.log('response: ', response);
//   }
//   }
// }

// function onClick () {
//   if (selected) {
//     let selectedWaypoint = {
//       location: {
//         lat: selected.value.stop_lat,
//         lng: selected.value.stop_lng
//       },
//       stopover: true,
//     };
//     console.log(selectedWaypoint);
//     setDirectionsOptions( (prev) => {
//       console.log('prev:', prev);
//       return {
//       ...prev,
//       waypoints: [...prev.waypoints, selectedWaypoint]
//       //  waypoints: [
//       //   {
//       //     location:  {lat: selected.value.stop_lat, lng: selected.value.stop_lng},
//       //     stopover: true,
//       //   }]
//     }});
//   }
//   else if (!selected && inputs.origin !== '' && inputs.destination !== '') {
//     console.log('ROUTE 1');
//       setDirectionsOptions( () => ({
//           response: directionsOptions.response,
//           origin: inputs.origin,
//           // origin: {query: inputs.origin},
//           destination: inputs.destination,
//           travelMode: 'DRIVING',
//           waypoints: {}
//           // waypoints: [
//           //   {
//           //     location:  {lat: 38.91200237, lng: -112.5088259},
//           //     stopover: true,
//           //   }]
//       }));
//     console.log(directionsOptions);
//   }


