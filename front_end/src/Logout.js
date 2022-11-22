const logout = () => {
  const [message, setMessage] = useState("");

  useEffect (() => {
    fetch("/logout")
      .then(response => response.json())
      .then(data => {setMessage(data.message)})
  }, [])

  return ( 
    <div className="ProfilePage">
        <p>{ message }</p>
    </div>
 );
}

export default logout;