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
    const [stopObj, setStopObj] = useState({
      key: '',
      value: {}
    });

    const [directionsOptions, setDirectionsOptions] = useState({
        response: null,
        travelMode: 'DRIVING',
        origin: '',
        destination: '',
        waypoints: {}
    });

    // const [distanceMatrixOptions, setDistanceMatrixOptions] = useState({
    //     response: null,
    //     travelMode: 'DRIVING',
    //     origins: [],
    //     destinations: [],
    //     waypoints: []
    // });

  function directionsCallback (response) {
      // console.log(response);
      // console.log(response.request);
      // console.log(response.request.destination);

    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsOptions(() => ({response}));
          console.log("directionsOptions:", directionsOptions);
        //   console.log(directionsOptions.origin);
      } else {
        console.log('response: ', response);
      }
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
      let selectedWaypoints = [];
      let selectedWaypoint = {
        location: {
          lat: selected.value.stop_lat,
          lng: selected.value.stop_lng
        },
        stopover: true,
      };
      console.log(selectedWaypoint);
      selectedWaypoints.push(selectedWaypoint);
      console.log(selectedWaypoints);
      setDirectionsOptions( () => ({
        response: directionsOptions.response,
        origin: inputs.origin,
        destination: inputs.destination,
        travelMode: 'DRIVING',
        waypoints: selectedWaypoints
        // waypoints: [
        //   {
        //     location:  {lat: selected.value.stop_lat, lng: selected.value.stop_lng},
        //     stopover: true,
        //   }]
      }));
    }
    else if (!selected && inputs.origin !== '' && inputs.destination !== '') {
      console.log('ROUTE 1');
        setDirectionsOptions( () => ({
            response: directionsOptions.response,
            origin: inputs.origin,
            // origin: {query: inputs.origin},
            destination: inputs.destination,
            travelMode: 'DRIVING',
            // waypoints: [
            //   {
            //     location:  {lat: 38.91200237, lng: -112.5088259},
            //     stopover: true,
            //   }]
        }));
        // setDistanceMatrixOptions( () => ({
        //   response: distanceMatrixOptions.response,
        //   origins: [inputs.origin],
        //   destinations: [inputs.destination],
        //   travelMode: 'DRIVING'
        // }));
      console.log(directionsOptions);
      // console.log(distanceMatrixOptions);
    }

  }

  function addStopToRoute (stopObj) {
    // console.log(stopObj);
    // setStopObj( () => ({
    //   key: selected.key,
    //   value: selected.value
    // }));
    // console.log(stopObj);
    console.log('after button clicked:',selected);
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
            onLoad={map => {
              console.log('DirectionsRenderer onLoad map: ', map)
            }}
            onUnmount={map => {
              console.log('DirectionsRenderer onUnmount map: ', map)
            }}
          >
            {stopsObj.map((stopObj) => (
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
                                    <button onClick={onClick}>Add to Route</button>
                                </div>
                            </InfoWindowF>
                        ) : null
            }

            {
              (
                directionsOptions.destination !== '' &&
                directionsOptions.origin !== ''
              ) && (
                <DirectionsService
                  options={{ 
                    destination: directionsOptions.destination,
                    origin: directionsOptions.origin,
                    travelMode: 'DRIVING',
                    waypoints: directionsOptions.waypoints
                  }}
                  callback={directionsCallback}
                //   if map keeps rerendering
                  // callback={(e) => directionsCallback(e)}
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService);
                    // console.log(directionsOptions.destination);
                  }}
                  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  }}
                /> 
              )
            }
            {/* {
              (
                directionsOptions.destination !== '' &&
                directionsOptions.origin !== ''
              ) && (
                <DistanceMatrixService 
                  options={{
                      destinations: [directionsOptions.destination, {lat:37.297817, lng:-113.028770}],
                      origins: [directionsOptions.origin, {lat:37.297817, lng:-113.028770}],
                      travelMode: 'DRIVING',
                  }}
                  // callback = {(response) => {console.log('DMS:',response)}}
                  callback = {(response) => {
                    setDistanceMatrixOptions( () => ({
                      response: response,
                      origins: response.originAddresses,
                      destinations: [inputs.destination],
                      travelMode: 'DRIVING'
                    }));
                    console.log('DMS:',response);
                    console.log('distanceMatrixOptions:', distanceMatrixOptions)
                  }}
                />
              )
            } */}
            {
              directionsOptions.response !== null && (
                <DirectionsRenderer
                  options={{ 
                    directions: directionsOptions.response
                  }}
                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer);
                    console.log(directionsOptions);
                  }}
                  onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
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


// import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
// import { React, useCallback, useEffect, useRef, useState } from "react";
// import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
// // import DistanceMatrix from "./DistanceMatrix";

// const RouteMap = () => {
//     const [libraries] = useState(['places']);
    // const [mapData, setMapData] =useState([]);
    // const [selected, setSelected] = useState(null);
//     const center = {lat: 37.733795, lng: -122.446747};
//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//         libraries,
//     });
   
    // useEffect(() => {
    //     fetch('/api/stops/map_data')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setMapData(data);
    //         });
    // }, []);

    // const stopsObj = Object.entries(mapData).map(([key, value]) => ({key, value}));
    // // console.log(stopsObj);

    // const mapRef = useRef();
    // const onMapLoad = useCallback((map) => {
    //     mapRef.current = map;
    // }, []);

    // const panTo = useCallback(({lat, lng}) => {
    //     mapRef.current.panTo({lat, lng});
    //     mapRef.current.setZoom(14);
    // }, []);

//     if (!isLoaded) return <div>Loading...</div>
//     return ( 
//         <div>
            // <StandaloneSearchBox panTo={panTo} />
//             <GoogleMap 
//                 zoom={11} 
//                 center={center} 
//                 mapContainerClassName="map-container"
//                 onLoad={onMapLoad}
//             >
                // {stopsObj.map((stopObj) => (
                //     <MarkerF  
                //         key={stopObj.key}
                //         position={{ lat: stopObj.value.stop_lat, lng: stopObj.value.stop_lng}} 
                //         onClick={() => {
                //             setSelected(stopObj);
                //         }}
                //     />
                // ))}
                // {selected ? (<InfoWindowF
                //                 position={{ lat: selected.value.stop_lat, lng: selected.value.stop_lng }} 
                //                 onCloseClick={() => {
                //                     setSelected(null);
                //                 }}
                //             >
                //                 <div>
                //                     <h2>{selected.value.stop_name}</h2>
                //                     <p>Category: {selected.value.stop_category}</p>
                //                 </div>
                //             </InfoWindowF>) : null}
            // </GoogleMap>
//             {/* <DistanceMatrix isLoaded={isLoaded}/> */}
//         </div>
//     );
// }
 
// export default RouteMap;
