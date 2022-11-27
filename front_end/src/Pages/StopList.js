const StopList = ({ obj, title }) => {

    return (
        <div className="stop-list">
            <h2>{ title }</h2>
            {obj.map((obj) => (
                 <div className="stop-preview" key={ obj.key }>
                    <h2>{ obj.value.stop_name }</h2>
                    <p>Category { obj.value.stop_category }</p>
                    <p>Latitude { obj.value.stop_lat }</p>
                    <p>Longitude { obj.value.stop_lng }</p>
                    {/* <button onClick={() => handleDelete(stop.id)}>Delete Stop</button> */}
                </div>
            ))}
        </div>
    );
}
 
export default StopList;

