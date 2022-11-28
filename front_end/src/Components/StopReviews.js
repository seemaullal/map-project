import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StopReviews = () => {
    let { stop_id } = useParams(); 
    const [reviews, setReviews] = useState([]); 

    useEffect(() => {
        fetch(`/api/stops/${stop_id}/reviews`) 
            .then(response => response.json())
            .then(data => {setReviews(data)}) 
            .catch(error => console.log(error));
    }, [stop_id]); 

    const reviewsObj = Object.entries(reviews).map(([key, value]) => ({key, value}))

    return ( 
        <div className="StopReviewDetails">
            <article>
            {reviewsObj.map((reviewObj) => (
                 <div className="review-preview" key={ reviewObj.key }>
                        <br></br>
                        <p>Rating: { reviewObj.value.rating }</p>
                        <p>Review: { reviewObj.value.content }</p>
                </div>
            ))}
            </article>
        </div>
     );
}
 
export default StopReviews;