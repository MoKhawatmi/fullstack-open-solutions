import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Users = () => {
    let [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/user').then(response => {
            console.log(response);
            if (response.status == 200) {
                setUsers(response.data)
            }
        })
    }, [])

    return (<div>
        <h1>Users</h1>
        <table>
            <tr> <th> </th> <th>Blogs created</th> </tr>
            {users.map(user => {
                return (<tr> <td><Link to={`/user/${user._id}`}>{user.userName}</Link></td> <td>{user.blogs.length}</td> </tr>)
            })}
        </table>
    </div>)
}

export default Users;