import { Link } from 'react-router-dom';

const StopList = ({ stopsObj, title }) => {

    const handleDelete = () => {
        console.log('deleted')
    }

    return (
        <div className="stop-list">
            <h2>{ title }</h2>
            {stopsObj.map((stopsObj) => (
                 <div className="stop-preview" key={ stopsObj.key }>
                    <Link to={`/api/stop/${stopsObj.value.stop_id}`}>{ stopsObj.value.stop_name }</Link> 
                    {/* <h2>{ obj.value.stop_name }</h2> */}
                    <p>Category { stopsObj.value.stop_category }</p>
                    <p>Latitude { stopsObj.value.stop_lat }</p>
                    <p>Longitude { stopsObj.value.stop_lng }</p>
                    { title  === "My Stops" &&
                        <button onClick={() => handleDelete(stopsObj.value.stop_lng)}>Delete Stop</button>
                    }
                </div>
            ))}
        </div>
    );
}
 
export default StopList;

