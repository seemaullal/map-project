import Navbar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import CreateAccountPage from './Pages/CreateAccountPage';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import CreateStopPage from './Pages/CreateStopPage';
import CreateRoutePage from './Pages/CreateRoutePage';
import injectContext from './Storage/appContext';
import AllStopsPage from './Pages/AllStopsPage';
import StopDetails from './Pages/StopDetailsPage';
import NotFound from './Components/NotFound';

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
            {/* <pre>{process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}</pre> */}
            <Route path="/" element={<Homepage />} /> 
            <Route path="/test" element={<Homepage />} /> 
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-stop" element={<CreateStopPage />} />
            <Route path="/create-route" element={<CreateRoutePage />} />
            <Route path="/stops" element={<AllStopsPage />} />
            <Route path="/stops/:stop_id" element={<StopDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default injectContext(App);



