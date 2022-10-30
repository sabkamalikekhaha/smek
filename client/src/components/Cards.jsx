import React, { useEffect, useState } from 'react'

const Cards = () => {

    const [count, setCount] = useState(0)
    function handleSomewhere() {
        setCount(count + 1)
    }

    const [user, setUser] = useState([]);

  const fetchData = () => {
    return fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((data) => setUser(data));
  }

  useEffect(() => {
    fetchData();
  },[])
  
    return (
        // <h1>User List</h1>
        <div>
                {user && user.length > 0 && user.map((userObj, index) => (
                    <h3>{userObj.name}</h3>
                ))}
                </div>
    )
}

export default Cards