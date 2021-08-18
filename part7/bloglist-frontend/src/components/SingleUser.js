import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SingleUser = () => {
    let [user, setUser] = useState(null);
    let [pending, setPending] = useState(true);
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/user/${id}`).then(response => {
            console.log(response);
            if (response.status == 200) {
                setUser(response.data);
            }
            setPending(false);
        }).catch(err => {
            setPending(false);
        })
    }, [])

    return (
        <div>
            {pending && <h1>Loading..</h1>}
            {user && <div>
                <h1>{user.userName}</h1>
                {user.blogs.length > 0 && <div>
                    <h2>Added blogs</h2>
                    <ul>
                        {user.blogs.map(blog => {
                            return <li>{blog.title}</li>
                        })}
                    </ul>
                </div>}
            </div>}
        </div>
    )
}

export default SingleUser;