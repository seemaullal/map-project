const StopList = ({ stops, title, handleDelete }) => {
    // or access props by passing in props above then the next two lines
    // const stops = props.stops;
    // const title = props.title;

    return (
        <div className="stop-list">
            <h2>{ title }</h2>
            {stops.map((stop) => (
                 <div className="stop-preview" key={stop.id}>
                    <h2>{ stop.name }</h2>
                    <p>Created by { stop.user }</p>
                    <button onClick={() => handleDelete(stop.id)}>Delete Stop</button>
                </div>
            ))}
        </div>
    );
}
 
export default StopList;