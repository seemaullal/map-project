import Navbar from './Navbar';
import Homepage from './Homepage';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  const [message, setMessage] = useState("")

  useEffect (() => {
    fetch("/users")
      .then(response => response.json())
      .then(data => {setMessage(data.hello)})
  }, [])

  return (
    <Router>
      <div className="App">
        <p>{ message }</p>
        <Navbar />
        <div className="content">
          <Homepage />
        </div>
      </div>
    </Router>
  );
}

export default App;
