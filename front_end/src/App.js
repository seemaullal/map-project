import Navbar from './Navbar';
import Homepage from './Homepage';
import { useEffect, useState } from 'react';


function App() {
const [message, setMessage] = useState("")

useEffect (() => {
  fetch("/users").then(response => response.json()).then(data => {setMessage(data.hello)})
}, [])

  return (
    <div className="App">
      <p>{ message }</p>
      <Navbar />
      <div className="content">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
