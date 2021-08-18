import React, { useState } from 'react'
import axios from 'axios'
import { likeBlogAction, deleteBlogAction } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blog = ({ blog, setBlogs }) => {
  let [fullDetail, setFullDetail] = useState(false);
  let dispatch = useDispatch();
  function viewBlogDetails() {
    fullDetail ? setFullDetail(false) : setFullDetail(true);
  }

  function handleLike(blogId) {
    let putObj = { blogId };
    axios.put("api/blogs/like", putObj).then(response => {
      console.log(response);
      dispatch(likeBlogAction(response.data));
    }).catch(err => {
      alert(err);
    })
  }

  function handleDelete(blogId) {
    let flag = window.confirm("delete blog?")
    if (flag) {
      setFullDetail(false);
      axios.delete(`api/blogs/${blogId}`).then(res => {
        console.log(res.data);
        dispatch(deleteBlogAction(res.data));
      }).catch(err => {
        alert(err)
      });
    }
  }

  return (
    <Link to={`/blogs/${blog._id}`}>
      <div className='blogPost'>
        {blog.title} {blog.author}
        {fullDetail && <div>
          <p>{blog.blogID}</p>
          <p>{blog.likes} <button onClick={() => { handleLike(blog._id) }}>Like</button></p>
          <button onClick={() => { handleDelete(blog._id) }}>remove</button>
        </div>}
        <button className='viewButton' onClick={viewBlogDetails}>View</button>
      </div></Link>

  )
}

export default Blog