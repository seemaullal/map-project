import { useParams } from "react-router-dom";

const StopDetails = () => {
    const { stop_id } = useParams()

    // const [myStops, setMyStops] = useState([]);
    
    // useEffect(() => {
    //     const user_id = sessionStorage.user_id

    //     fetch(`/api/stops/${stop_id}`)
    //         .then(response => response.json())
    //         .then(data => {setMyStops(data)})
    //         .catch(error => console.log(error));
    // }, []);

    return ( 
        <div className="StopPage">
            <p>A Stop's Details - { stop_id }</p>
        </div>
     );
}
 
export default StopDetails;