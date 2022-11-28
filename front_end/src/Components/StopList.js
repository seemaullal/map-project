import { Link } from 'react-router-dom';
// import DeleteStop from './DeleteStop';

const StopList = ({ stopsObj, title }) => {
  
    const handleDelete = () => {
        console.log('deleted stop')
    }

    // for (const stop of stopsObj) {
    //     let user_id = stop.value.user_id
    //     console.log("user_id", user_id)
    //     console.log(stop)
    // }

    // const newstopsObj = Object.entries(stopsObj).map(([key, value]) => ({key, value}))
    // console.log(newstopsObj)

    return (
        <div className="stop-list">
            <h2>{ title }</h2>
            {/* {stopsObj && <DeleteStop stopsObj={stopsObj} />} */}
            {stopsObj.map((stopObj) => (
                 <div className="stop-preview" key={ stopObj.key }>
                    <Link to={`/stops/${stopObj.value.stop_id}`}>
                        <h2>{ stopObj.value.stop_name }</h2>
                        <p>Category { stopObj.value.stop_category }</p>
                        <p>Latitude { stopObj.value.stop_lat }</p>
                        <p>Longitude { stopObj.value.stop_lng }</p>
                    </Link> 
                    { title  === "My Stops" &&
                        <button onClick={() => handleDelete(stopObj.value.stop_id)}>Delete Stop</button>
                    }
                </div>
            ))}
        </div>
    );
}
 
export default StopList;

// import { Link } from 'react-router-dom';
// // import DeleteStop from './DeleteStop';

// const StopList = ({ stopsObj, title }) => {
  
//     const handleDelete = () => {
//         console.log('deleted stop')
//     }

//     console.log(stopsObj)

//     const newstopsObj = Object.entries(stopsObj).map(([key, value]) => ({key, value}))
//     console.log(newstopsObj)

//     return (
//         <div className="stop-list">
//             <h2>{ title }</h2>
//             {/* {stopsObj && <DeleteStop stopsObj={stopsObj} />} */}
//             {stopsObj.map((stopsObj) => (
//                  <div className="stop-preview" key={ stopsObj.key }>
//                     <Link to={`/api/stops/${stopsObj.value.user_id}/${stopsObj.value.stop_id}`}>{ stopsObj.value.stop_name }</Link> 
//                     {/* <h2>{ obj.value.stop_name }</h2> */}
//                     <p>Category { stopsObj.value.stop_category }</p>
//                     <p>Latitude { stopsObj.value.stop_lat }</p>
//                     <p>Longitude { stopsObj.value.stop_lng }</p>
//                     { title  === "My Stops" &&
//                         <button onClick={() => handleDelete(stopsObj.value.stop_id)}>Delete Stop</button>
//                     }
//                 </div>
//             ))}
//         </div>
//     );
// }
 
// export default StopList;

