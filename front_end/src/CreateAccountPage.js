import { useState } from "react";
export default function CreateAccountPage (props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { firstName, lastName, email, username, password, phoneNumber }

        console.log(user)
    }

    return ( 
        <div className="CreateAccountPage">
            <h2>Create An Account</h2>
            <form className="CreateAccountForm" onSubmit={handleSubmit}>
                <label>First name:</label>
                <input 
                    type="text"  
                    required
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label>Last name:</label>
                <input 
                    type="text" 
                    required 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label>Email:</label>
                <input 
                    type="text" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Username:</label>
                <input 
                    type="text" 
                    required 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password:</label>
                <input 
                    type="text" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Phone Number:</label>
                <input 
                    type="text" 
                    required 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button type="submit">Submit</button>
                <p>{ firstName }</p>
            </form>
        </div>
     );
}

