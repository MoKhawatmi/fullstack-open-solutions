import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginAction, logoutAction } from '../reducers/userReducer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { changeNotification } from "../App";

const UserName = (props) => {
    let dispatch = useDispatch();

    function handleLogout() {
        axios.get('http://localhost:3000/api/user/logout').then(response => {
            dispatch(logoutAction());
            localStorage.setItem("user", null);
        }).catch(err => {
            console.log(err);
        })
    }
    return (<div><p>{props.user} logged in</p> <button onClick={handleLogout}>logout</button></div>)
}

const Nav = () => {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let dispatch = useDispatch();

    useEffect(() => {
        let user = window.localStorage.getItem("user");
        if (user) {
            dispatch(loginAction(JSON.parse(user)))
        } else {
            dispatch(logoutAction())
        }
    }, [])
    let user=useSelector((state) => state.user);

    function handleLogin(event) {
        event.preventDefault();
        console.log(username);
        console.log(password);
        axios.post('http://localhost:3000/api/user/login', { userName: username, password }).then(response => {
            if (response.status == 200) {
                dispatch(loginAction(response.data))
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
            } else {
                changeNotification("Login failed", dispatch);
            }
        }).catch(err => {
            changeNotification("Login failed", dispatch);
        });
    }

    return (<div style={{width:'100%'}}>
        <ul className="navbar">
            <li> <Link to="/">Blogs</Link> </li>
            <li> <Link to="/users">Users</Link> </li>
            <li>
            {!user && <div>
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">username <input type="text" name="username" id="username" onChange={({ target }) => setUsername(target.value)} /></label>
                    <label htmlFor="password">password <input type="password" name="password" id="password" onChange={({ target }) => setPassword(target.value)} /></label>
                    <button>login</button>
                </form>
            </div>}
            {user && <UserName user={user.userName} />}
            </li>
        </ul>
    </div>)
}

export default Nav;