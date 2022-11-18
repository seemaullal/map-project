export default function CreateAccountPage (props) {

    return ( 
        <div className="CreateAccountPage">
            <h2>Create An Account</h2>
            <form className="CreateAccountForm">
                <label>First name:</label>
                <input type="text" required />
                <label>Last name:</label>
                <input type="text" required />
                <label>Email:</label>
                <input type="text" required />
                <label>Username:</label>
                <input type="text" required />
                <label>Password:</label>
                <input type="text" required />
                <label>Phone Number:</label>
                <input type="text" required />
                <button>Submit</button>
            </form>
        </div>
     );
}

