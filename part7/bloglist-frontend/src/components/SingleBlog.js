import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'

const Comments = ({ comments, id }) => {
    let [commentList, setCommentList] = useState([]);
    let [comment, setComment] = useState('');
    useEffect(() => {
        setCommentList(comments);
    }, []);

    function handleComment() {
        console.log(comment);
        axios.put(`http://localhost:3000/api/blogs/${id}/comment`, { comment })
            .then(response => {
                console.log(response);
                setCommentList(response.data.comments);
                setComment('');
            }).catch(err => {
                console.log(err);
                setComment('');
            })
    }

    return (
        <div>
            <label htmlFor="comment"></label>
            <input value={comment} type="text" id="comment" name="comment" onChange={({ target }) => setComment(target.value)} />
            <button onClick={handleComment}>Add comment</button>

            {commentList.length > 0 && <div>
                <h3>Comments</h3>
                <ul>
                    {commentList.map((comment,index ) => {
                       return <li key={index * 35 + 2135235}>{comment}</li>
                    })}
                </ul>
            </div>}
        </div>
    )
}

const SingleBlog = () => {
    let [isPending, setIsPending] = useState(true);
    let [blog, setBlog] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/blogs/${id}`).then(response => {
            console.log(response);
            if (response.status == 200) {
                setBlog(response.data);
                setIsPending(false);
            }
        })
    }, [])

    function handleLike(blogId) {
        let putObj = { blogId };
        axios.put("http://localhost:3000/api/blogs/like", putObj).then(response => {
            console.log(response);
            setBlog(response.data);
        }).catch(err => {
            alert(err);
        })
    }

    return (<div>
        {isPending && <div>Loading</div>}
        {blog && <div>
            <div>
                <h1>{blog.title}</h1>
                <p>{blog.likes} likes <button onClick={() => { handleLike(blog._id) }}>Like</button></p>
                <p>By {blog.author}</p>
            </div>
            <div>
                <Comments comments={blog.comments} id={blog._id} />
            </div>
        </div>
        }
    </div>)
}

export default SingleBlog;