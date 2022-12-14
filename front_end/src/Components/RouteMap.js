import { GoogleMap, DirectionsService, DirectionsRenderer, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { React, useCallback, useEffect, useRef, useState } from "react";

export default function RouteMap () {
    const [inputs, setInputs] = useState({});
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });
    const [state, setState] = useState({
        response: {},
        travelMode: 'DRIVING',
        origin: '',
        destination: '',
        // origin: '637 Madrone Avenue, Sunnyvale, CA, 94085',
        // destination: '60 Sereno Circle, Oakland, CA, 94619',
    });

  function directionsCallback (response) {
      console.log(response);

    if (response !== null) {
      if (response.status === 'OK') {
          setState(() => ({response}));
          console.log("state:",state);
          console.log(state.origin);
          console.log(state.destination);
      } else {
        console.log('response: ', response);
      }
    }
  }

//   function checkDriving ({ target: { checked } }) {
//       checked &&
//         setState(() => ({travelMode: 'DRIVING'}));
//   }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
    // console.log(inputs);
    }

//   function getOrigin (ref) {
//       state.origin = ref
//   }

//   function getDestination (ref) {
//     state.destination = ref
//   }

  function onClick () {
    console.log("in onCLick");
    if (inputs.origin !== '' && inputs.destination !== '') {
    setState(
        () => ({
        origin: inputs.origin,
        destination: inputs.destination,
        travelMode: 'DRIVING'
        })
    );
    console.log(state.origin);
    console.log(state.destination);
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
                    // onClick={(e) => {
                    //     origin = e.target.value;
                    //     setState(state.origin);
                    //     console.log(state);
                    // }} 
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
                    // onChange={(e) => {
                    //     destination = e.target.value;
                    //     setState(state.destination);
                    //     console.log(state);
                    // }} 
                    name='destination'
                    value={inputs.destination || ""}
                    onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className='d-flex flex-wrap'>
            {/* <div className='form-group custom-control custom-radio mr-4'>
              <input
                id='DRIVING'
                className='custom-control-input'
                name='travelMode'
                type='radio'
                checked={state.travelMode === 'DRIVING'}
                onChange={checkDriving}
              />
              <label className='custom-control-label' htmlFor='DRIVING'>Driving</label>
            </div> */}

          </div>
            {/* onClick={onClick} below in button attributes */}
          <button className='btn btn-primary' type='button' onClick={onClick}>
            Build Route
          </button>
        </div>

        <div className='map-container'>
          <GoogleMap
            id='direction-example'
            mapContainerStyle={{
              height: '400px',
              width: '100%'
            }}
            zoom={10}
            center={{
                lat: 37.733795, 
                lng: -122.446747
            }}
            // optional
            onClick={onMapClick}
            // optional
            onLoad={map => {
              console.log('DirectionsRenderer onLoad map: ', map)
            }}
            // optional
            onUnmount={map => {
              console.log('DirectionsRenderer onUnmount map: ', map)
            }}
          >
            {
              (
                state.destination !== '' &&
                state.origin !== ''
              ) && (
                <DirectionsService
                  // required
                  options={{ 
                    destination: state.destination,
                    origin: state.origin,
                    travelMode: 'DRIVING'
                  }}
                  // required
                  callback={directionsCallback}
                  // optional
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService);
                    console.log(state.destination);
                  }}
                  // optional
                  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  }}
                />
              )
            }

            {
              state.response !== null && (
                <DirectionsRenderer
                  // required
                  options={{ 
                    directions: state.response
                  }}
                  // optional
                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer);
                    console.log(state);
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


// import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
// import { React, useCallback, useEffect, useRef, useState } from "react";
// import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
// import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
// import "@reach/combobox/styles.css";
// // import DistanceMatrix from "./DistanceMatrix";

// const RouteMap = () => {
//     const [libraries] = useState(['places']);
//     const [mapData, setMapData] =useState([]);
//     const [selected, setSelected] = useState(null);
//     const center = {lat: 37.733795, lng: -122.446747};
//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//         libraries,
//     });
   
//     useEffect(() => {
//         fetch('/api/stops/map_data')
//             .then((response) => response.json())
//             .then((data) => {
//                 setMapData(data);
//             });
//     }, []);

//     const stopsObj = Object.entries(mapData).map(([key, value]) => ({key, value}));
//     // console.log(stopsObj);

//     const mapRef = useRef();
//     const onMapLoad = useCallback((map) => {
//         mapRef.current = map;
//     }, []);

//     const panTo = useCallback(({lat, lng}) => {
//         mapRef.current.panTo({lat, lng});
//         mapRef.current.setZoom(14);
//     }, []);

//     if (!isLoaded) return <div>Loading...</div>
//     return ( 
//         <div>
//             <StandaloneSearchBox panTo={panTo} />
//             <GoogleMap 
//                 zoom={11} 
//                 center={center} 
//                 mapContainerClassName="map-container"
//                 onLoad={onMapLoad}
//             >
//                 {stopsObj.map((stopObj) => (
//                     <MarkerF  
//                         key={stopObj.key}
//                         position={{ lat: stopObj.value.stop_lat, lng: stopObj.value.stop_lng}} 
//                         onClick={() => {
//                             setSelected(stopObj);
//                         }}
//                     />
//                 ))}
//                 {selected ? (<InfoWindowF
//                                 position={{ lat: selected.value.stop_lat, lng: selected.value.stop_lng }} 
//                                 onCloseClick={() => {
//                                     setSelected(null);
//                                 }}
//                             >
//                                 <div>
//                                     <h2>{selected.value.stop_name}</h2>
//                                     <p>Category: {selected.value.stop_category}</p>
//                                 </div>
//                             </InfoWindowF>) : null}
//             </GoogleMap>
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
