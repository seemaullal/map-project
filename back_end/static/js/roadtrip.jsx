const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const HashRouter = ReactRouterDOM.HashRouter;


// const App = (props) => {
//     return (
//         <ReactRouterDOM.HashRouter>
//             <ul>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/login">Login</Link></li>
//                 <li><Link to="/register">Register</Link></li>
//             </ul>

//             <Route path="/" exact component={Home} />
//             <Route path="/login" component={Login} />
//             <Route path="/register" component={Register} />
//         </ReactRouterDOM.HashRouter>
//     )
// }


const Home = () => <h1>Home</h1>
const Login = () => <h1>Login</h1>
const Register = () => <h1>Register</h1>

const NavBar = (props) => {
    return (
        <ul>
            <li>
                Home
            </li>
            <li>
                Profile
            </li>
            <li>
                My Stops
            </li>
        </ul>
    )
}

const MainContent = (props) => {
    return (
        <div> <SubContent /> </div>
    )
}

const SubContent = (props) => {
    return (
        <div> 
            <p>My Roadtrip App</p>
        </div>
    )
}

const App = (props) => {
    return (
        <div>
            <NavBar></NavBar>
            <MainContent></MainContent>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));