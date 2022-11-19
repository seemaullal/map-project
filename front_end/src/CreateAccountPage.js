import { useState } from "react";
import { Link } from "react-router-dom";


export default function CreateAccountPage () {
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log('handleChange triggered')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            fname: inputs.fname,
            lname: inputs.lname,
            email: inputs.email,
            username: inputs.username,
            password: inputs.password,
            phone_num: inputs.phone_num
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch('/register', requestOptions)
            .then(response => response.json())
            .then(data =>{console.log(data)})
            .catch(err => console.log(err))

        
        console.log('handleSubmit triggered');
        console.log(inputs);
        alert('Account created successfully, Please log in.')
    }

    return ( 
        <div className="CreateAccountPage" onSubmit={handleSubmit}>
            <h2>Create An Account</h2>
            <form className="CreateAccountForm">
                <label>First name:</label>
                <input 
                    type="text" 
                    required 
                    name="fname" 
                    value={inputs.fname || ""}
                    onChange={handleChange}
                />
                <label>Last name:</label>
                <input 
                    type="text" 
                    required 
                    name="lname" 
                    value={inputs.lname || ""}
                    onChange={handleChange}
                />
                <label>Email:</label>
                <input 
                    type="text" 
                    required 
                    name="email" 
                    value={inputs.email || ""}
                    onChange={handleChange}
                />
                <label>Username:</label>
                <input 
                    type="text" 
                    required 
                    name="username" 
                    value={inputs.username || ""}
                    onChange={handleChange}
                />
                <label>Password:</label>
                <input 
                    type="text" 
                    required 
                    name="password" 
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
                <label>Phone Number:</label>
                <input 
                    type="text" 
                    required 
                    name="phone_num" 
                    value={inputs.phone_num || ""}
                    onChange={handleChange}
                />
                <button>Submit</button>
                <br></br>
                <small>Already have an account? <Link to='/login'>Log In</Link></small>
            </form>
        </div>
     );
}


// export default function CreateAccountPage () {
//     const initialFormData = Object.freeze({
//         fname: "",
//         lname: "",
//         email: "",
//         username: "",
//         password: "",
//         phone_num: ""
//     });

//     const [formData, setFormData] = useState(initialFormData);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,

//             [e.target.name]: e.target.value.trim()
//         });
//         console.log('handleChange triggered')
//     };

//     const handleSubmit = (e) => {
//             e.preventDefault()
//             console.log(formData);
//             // submit to API or something
//     };

//     return ( 
//         <div className="CreateAccountPage">
//             <h2>Create An Account</h2>
//             <form className="CreateAccountForm">
//                 <label>First name:</label>
//                 <input 
//                     type="text" 
//                     required 
//                     name="fname" 
//                     onChange={handleChange}
//                 />
//                 <label>Last name:</label>
//                 <input 
//                     type="text" 
//                     required 
//                     name="lname" 
//                     onChange={handleChange}
//                 />
//                 <label>Email:</label>
//                 <input 
//                     type="text" 
//                     required 
//                     name="email" 
//                     onChange={handleChange}
//                 />
//                 <label>Username:</label>
//                 <input 
//                     type="text" 
//                     required 
//                     name="username" 
//                     onChange={handleChange}
//                 />
//                 <label>Password:</label>
//                 <input 
//                     type="text" 
//                     required 
//                     name="password" 
//                     onChange={handleChange}
//                 />
//                 <label>Phone Number:</label>
//                 <input 
//                     type="text" 
//                     required 
//                     name="phone_num" 
//                     onChange={handleChange}
//                 />
//                 <button onClick={handleSubmit}>Submit</button>
//             </form>
//         </div>
//     );  
// };
