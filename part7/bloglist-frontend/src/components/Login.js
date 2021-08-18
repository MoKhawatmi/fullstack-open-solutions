import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const LoginForm = (props) => {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [user, setUser] = useState(null);

    function handleLogin(event) {
        event.preventDefault();
        console.log(username);
        console.log(password);
        axios.post('api/user/login', { userName: username, password }).then(response => {
            if (response.status == 200) {
                setUser(response.data);
                console.log(response.data);
                console.log(user);
                localStorage.setItem("user",JSON.stringify(user));
            } else {
                alert("something went wrong");
            }
        }).catch(err=>{
            alert("something went wrong");
        });
    }

    return (<div>
        <form onSubmit={handleLogin}>
            <label htmlFor="username">username <input type="text" name="username" id="username" onChange={({ target }) => setUsername(target.value)} /></label>
            <label htmlFor="password">password <input type="password" name="password" id="password" onChange={({ target }) => setPassword(target.value)} /></label>
            <button>login</button>
        </form>
    </div>)
}

export default LoginForm