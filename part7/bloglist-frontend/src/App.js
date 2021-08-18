import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import blogService from './services/blogs'
import './style.css'
import Blog from './components/Blog'
import SingleBlog from './components/SingleBlog'
import Nav from './components/Nav'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import axios from 'axios'
import PropTypes from 'prop-types'
import { notiAction, removeNotiAction } from './reducers/notiReducer'
import { getBlogsAction, createBlogAction } from './reducers/blogReducer'
import { loginAction, logoutAction } from './reducers/userReducer'


const Notification = (props) => {
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

export function changeNotification(msg, dispatch) {

  console.log("called", msg);
  dispatch(notiAction(msg));
  setTimeout(() => {
    dispatch(removeNotiAction())
  }, 3000)
}

const App = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log(blogs);
      dispatch(getBlogsAction(blogs));
    })
  }, [])


  function submitBlog(event) {
    event.preventDefault();
    let title = event.target["title"].value;
    let author = "";
    let blogID = event.target["blogID"].value;
    let likes = 0;
    let comments=[];
    axios.post('api/blogs/', { title, author, blogID, likes, comments }).then(response => {
      dispatch(createBlogAction(response.data))
      changeNotification(`Added ${response.data.title} by ${response.data.author} successfully`, dispatch);
      console.log(response);
    }).catch(err => {
      console.log(err);
    })

  }

  let notification = useSelector((state) => state.notification);
  let user = useSelector((state) => state.user);

  return (
    <Router>
      <Nav />
      {notification && <Notification note={notification} />}
      <Switch>
        <Route exact path="/">
          <div>
            <h2>blogs</h2>
            {user && <ToggleComp> <PostBlogForm submitBlog={submitBlog} /> </ToggleComp>}

            {useSelector((state) => state.blogs).sort((a, b) => {
              return a.likes > b.likes ? -1 : 1;
            }).map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        </Route>
            
        <Route exact path="/users">
          <Users />
        </Route>

        <Route exact path="/user/:id">
          <SingleUser />
        </Route>

        <Route exact path="/blogs/:id">
          <SingleBlog />
        </Route>
      </Switch>
    </Router>

  )
}

export default App