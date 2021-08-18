import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import notiReducer from './reducers/notiReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import App from './App'

let reducer = combineReducers({
    user: userReducer,
    notification: notiReducer,
    blogs: blogReducer
})

let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))