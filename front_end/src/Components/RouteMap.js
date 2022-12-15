import { GoogleMap, DirectionsService, DirectionsRenderer, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { React, useCallback, useEffect, useRef, useState } from "react";
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

    const [directionsOptions, setDirectionsOptions] = useState({
        response: null,
        travelMode: 'DRIVING',
        origin: '',
        destination: '',
    });

  function directionsCallback (response) {
      console.log(response);
      console.log(response.request);
      console.log(response.request.destination);

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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
    }

  function onClick () {
    if (inputs.origin !== '' && inputs.destination !== '') {
        setDirectionsOptions( () => ({
            response: directionsOptions.response,
            origin: inputs.origin,
            destination: inputs.destination,
            travelMode: 'DRIVING'
        }));
    }
  }

  function addStopToRoute () {

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
          {directionsOptions.response !== null && (
              <DirectionsAccordion directionsOptions={directionsOptions}/>
          )}
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
                    }}
                    visible={true}
                />
            ))}
            {selected ? (
                            <InfoWindowF
                                position={{ lat: selected.value.stop_lat, lng: selected.value.stop_lng }} 
                                onCloseClick={() => {
                                    setSelected(null);
                                }}
                            >
                                <div>
                                    <h2>{selected.value.stop_name}</h2>
                                    <p>Category: {selected.value.stop_category}</p>
                                    <button>Add to Route</button>
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
                    travelMode: 'DRIVING'
                  }}
                  callback={directionsCallback}
                //   if map keeps rerendering
                //   callback={(e) => directionsCallback(e)}
                  // optional
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService);
                    console.log(directionsOptions.destination);
                  }}
                  // optional
                  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  }}
                /> 
              )
            }

            {
              directionsOptions.response !== null && (
                <DirectionsRenderer
                  options={{ 
                    directions: directionsOptions.response
                  }}
                  // optional
                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer);
                    console.log(directionsOptions);
                  }}
                  // optional
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
// import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
// import "@reach/combobox/styles.css";
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

// function StandaloneSearchBox({ panTo }) {
//     const {
//         ready, 
//         value, 
//         suggestions : {status, data}, 
//         setValue, 
//         clearSuggestions} 
//         = usePlacesAutocomplete({
//         requestOptions: {
//             location: { lat: () => 37.2982, lng: () => -113.0263 },
//             radius: 50 * 1609.344,
//         },
//     });

//     return (
//         <Combobox 
//             onSelect={async (address) => {
//                 setValue(address, false);
//                 clearSuggestions();
//                 try {
//                     const results = await getGeocode({address});
//                     const { lat, lng } = getLatLng(results[0]);
//                     panTo({ lat, lng });
//                     console.log(lat, lng);
//                 } catch(error) {
//                     console.log("There was an error.");
//                 }
//             }}
//         >
//             <ComboboxInput 
//                 value={value} 
//                 onChange={(e) => {
//                     setValue(e.target.value);
//                 }} 
//                 disabled={!ready}
//                 placeholder="Enter an address"
//             />
//             <ComboboxPopover>
//                 <ComboboxList>
//                     {status === "OK" && 
//                         data.map(({id, description}) => (
//                             <ComboboxOption key={id} value={description} />
//                         ))}
//                 </ComboboxList>
//             </ComboboxPopover>
//         </Combobox>
//     );
// }
 
// export default RouteMap;
