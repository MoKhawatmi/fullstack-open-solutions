import React, { useState, useEffect } from 'react'
import './style.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'
import PropTypes from 'prop-types'


//import LoginForm from './components/Login'

const UserName = (props) => {
  function handleLogout() {
    axios.get('api/user/logout').then(response => {
      props.changeUser(null);
      localStorage.setItem("user", null);
    }).catch(err => {
      console.log(err);
    })
  }
  return (<div><p>{props.user} logged in</p> <button onClick={handleLogout}>logout</button></div>)
}

const Notification = (props) => {
  console.log(props);
  return (<p>{props.note}</p>)
}

const PostBlogForm = (props) => {

  PostBlogForm.propTypes = {
    submitBlog: PropTypes.func.isRequired
  }

  return (<div>
    <form onSubmit={props.submitBlog}>
      <label htmlFor="title">title <input type="text" name="title" id="title" /></label>
      <label htmlFor="blogID">blogId <input type="text" name="blogID" id="blogID" /></label>
      <label htmlFor="likes">likes <input type="text" name="likes" id="likes" /></label>
      <button>submit</button>
    </form>
  </div>)
}

const ToggleComp = (props) => {
  let [visible, setVisible] = useState(false);

  return (<div>
    {!visible && <button onClick={() => { setVisible(true) }}>Post blog</button>}
    {visible && props.children}
    {visible && <button onClick={() => { setVisible(false) }}>cancel</button>}
  </div>

  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [user, setUser] = useState(null);
  let [notification, setNotification] = useState(null);

  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user))
    } else {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  function handleLogin(event) {
    event.preventDefault();
    console.log(username);
    console.log(password);
    axios.post('api/user/login', { userName: username, password }).then(response => {
      if (response.status == 200) {
        setUser(response.data);
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        changeNotification("Login failed");
      }
    }).catch(err => {
      changeNotification("Login failed");
    });
  }

  function changeNotification(msg) {
    console.log("called", msg);
    setNotification(msg);
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  function submitBlog(event) {
    event.preventDefault();
    let title = event.target["title"].value;
    let author = "";
    let blogID = event.target["blogID"].value;
    let likes = 0;
    axios.post('api/blogs/', { title, author, blogID, likes }).then(response => {
      setBlogs(blogs.concat(response.data))
      changeNotification(`Added ${response.data.title} by ${response.data.author} successfully`);
      console.log(response);
    }).catch(err => {
      console.log(err);
    })

  }



  return (
    <div>
      {notification && <Notification note={notification} />}
      {!user && <div>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">username <input type="text" name="username" id="username" onChange={({ target }) => setUsername(target.value)} /></label>
          <label htmlFor="password">password <input type="password" name="password" id="password" onChange={({ target }) => setPassword(target.value)} /></label>
          <button>login</button>
        </form>
      </div>}
      <h2>blogs</h2>
      {user && <UserName user={user.userName} changeUser={setUser} />}
      {user && <ToggleComp> <PostBlogForm submitBlog={submitBlog} /> </ToggleComp>}

      {blogs.sort((a, b) => {
        return a.likes > b.likes ? -1 : 1;
      }).map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App