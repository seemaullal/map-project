import Navbar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import CreateAccountPage from './Pages/CreateAccountPage';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Logout from './Logout';
import CreateStopPage from './CreateStop';
import injectContext from './Storage/appContext';


function App() {
  const [message, setMessage] = useState("");
  // const [users, setUsers] = useState("");

  useEffect (() => {
    fetch("/test")
      .then(response => response.json())
      .then(data => {setMessage(data.hello)})
  }, [])

  // useEffect (() => {
  //   fetch("/profile")
  //     .then(response => response.json())
  //     .then(data => {setUsers(data)})
  // }, [])

  return (
    <Router>
      <div className="App">
        <p>{ message }</p>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} /> 
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-stop" element={<CreateStopPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default injectContext(App);

// add users={users} to profile pge element as a prop in the route


