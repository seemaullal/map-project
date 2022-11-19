import { Link } from "react-router-dom";

const LoginPage = () => {
    return ( 
        <div className="LoginPage">
            <h2>Login</h2>
            <form className="LoginForm">
                <label>Email:</label>
                <input 
                    type="text" 
                    required 
                />
                <label>Password:</label>
                <input 
                    type="text" 
                    required 
                />
                <button>Sign In</button>
                <br></br>
                <small>Don't have an account? <Link to='/create-account'>Create an Account</Link></small>
            </form>
        </div>
     );
}
 
export default LoginPage;