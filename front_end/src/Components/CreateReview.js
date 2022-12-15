import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateReview = ({ onQuery }) => {
    let { stop_id } = useParams(); 
    const [inputs, setInputs] = useState({});

    const handleInput = (e) => {
        onQuery(e.target.value);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            user_id: sessionStorage.user_id,
            stop_id: stop_id,
            rating: inputs.rating,
            content: inputs.content
        }
        console.log(sessionStorage);

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch(`/api/stops/${stop_id}/review`, requestOptions)
            .then(response => response.json())
            .then(data =>console.log(data))
            .catch(error => console.log(error))

        
        console.log('handleSubmit triggered');
        console.log(inputs);
        console.log(body);
    }

    return ( 
        <div className="CreateReview" onSubmit={handleSubmit}>
            <h2>Leave a Review</h2>
                <form className="CreateReviewForm">
                    <label>Rating</label>
                    <input 
                        type="text" 
                        required 
                        name="rating"
                        value={inputs.rating || ""}
                        onChange={handleChange}
                        onInput={handleInput}
                    />
                    <label>Review</label>
                    <input 
                        type="text" 
                        required 
                        name="content"
                        value={inputs.content || ""}
                        onChange={handleChange} 
                        onInput={handleInput}
                    />
                    <button>Create Review</button>
                </form>
        </div>
    );
}
 
export default CreateReview;

