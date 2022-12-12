import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { React, useCallback, useEffect, useRef, useState } from "react";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
// import DistanceMatrix from "./DistanceMatrix";

const RouteMap = () => {
    const api_library = ["places"]
    const [mapData, setMapData] =useState([]);
    const [selected, setSelected] = useState(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries:api_library,
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

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

    if (!isLoaded) return <div>Loading...</div>
    return ( 
        <div>
            <StandaloneSearchBox panTo={panTo} />
            <GoogleMap 
                zoom={10} 
                center={{lat:37.2982, lng: -113.0263}} 
                mapContainerClassName="map-container"
                onLoad={onMapLoad}
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
            {/* <DistanceMatrix isLoaded={isLoaded}/> */}
        </div>
    );
}

function StandaloneSearchBox({ panTo }) {
    const {
        ready, 
        value, 
        suggestions : {status, data}, 
        setValue, 
        clearSuggestion} 
        = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 37.2982, lng: () => -113.0263 },
            radius: 50 * 1609.344,
        },
    });

    return (
        <Combobox 
            onSelect={async (address) => {
                try {
                    const results = await getGeocode({address});
                    const { lat, lng } = getLatLng(results[0]);
                    panTo({ lat, lng });
                    console.log(lat, lng);
                } catch(error) {
                    console.log("There was an error.");
                }
            }}
        >
            <ComboboxInput 
                value={value} 
                onChange={(e) => {
                    setValue(e.target.value);
                }} 
                disabled={!ready}
                placeholder="Enter an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && 
                        data.map(({id, description}) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
}
 
export default RouteMap;
