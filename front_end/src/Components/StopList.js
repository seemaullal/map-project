import { Link } from 'react-router-dom';
// import DeleteStop from './DeleteStop';

const StopList = ({ stopsObj, title }) => {
  
    const handleDelete = () => {
        console.log('deleted stop')
    }

    console.log(stopsObj)

    return (
        <div className="stop-list">
            <h2>{ title }</h2>
            {/* {stopsObj && <DeleteStop stopsObj={stopsObj} />} */}
            {stopsObj.map((stopsObj) => (
                 <div className="stop-preview" key={ stopsObj.key }>
                    <Link to={`/api/stops/${stopsObj.value.user_id}/${stopsObj.value.stop_id}`}>{ stopsObj.value.stop_name }</Link> 
                    {/* <h2>{ obj.value.stop_name }</h2> */}
                    <p>Category { stopsObj.value.stop_category }</p>
                    <p>Latitude { stopsObj.value.stop_lat }</p>
                    <p>Longitude { stopsObj.value.stop_lng }</p>
                    { title  === "My Stops" &&
                        <button onClick={() => handleDelete(stopsObj.value.stop_id)}>Delete Stop</button>
                    }
                </div>
            ))}
        </div>
    );
}
 
export default StopList;

