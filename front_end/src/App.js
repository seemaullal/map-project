import Navbar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import CreateAccountPage from './Pages/CreateAccountPage';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CreateStopPage from './CreateStop';
import injectContext from './Storage/appContext';
import AllStopsPage from './Pages/AllStopsPage';
import StopDetails from './Pages/StopDetailsPage';


function App() {
  const [message, setMessage] = useState("");

  useEffect (() => {
    fetch("/test")
      .then(response => response.json())
      .then(data => {setMessage(data.hello)})
  }, [])


  return (
    <Router>
      <div className="App">
        <p>{ message }</p>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} /> 
            <Route path="/test" element={<Homepage />} /> 
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-stop" element={<CreateStopPage />} />
            <Route path="/stops" element={<AllStopsPage />} />
            <Route path="/stops/:stop_id" element={<StopDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default injectContext(App);



