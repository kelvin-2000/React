"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [userList, setUserList] = useState([])
    
    useEffect(() => {
        // const url = "http://localhost:8000/api/read";
        const url = "http://localhost:8000/api_n_tier/read";
        axios.get(url).then((response) => {
            setUserList(response.data)
        })
    }, []);
    
    const deleteUser = () => {
      const delURL = "http://localhost:8000/api_n_tier/delete";
      axios.delete(delURL, email)
    }

  return (
    <div className="App">
      <h1 className="text-center">CRUD Prototype (Read, Delete)</h1>

      <table>
        <thead>
            <tr>
                <th>UID</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
                <th></th>
            </tr>
        </thead>

        <tbody>
        {userList.map((user, index) => (
            <tr key={index}>
                <td>{user.uid}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td><a href="/">Update</a></td>
                <td><button onClick={deleteUser}>Delete</button></td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
