const LoginPage = () => {
    return ( 
        <div className="LoginPage">
            <h2>Login</h2>
            <form className="LoginForm">
                <label>Username:</label>
                <input type="text" required />
                <label>Password:</label>
                <input type="text" required />
                <button>Sign In</button>
            </form>
        </div>
     );
}
 
export default LoginPage;