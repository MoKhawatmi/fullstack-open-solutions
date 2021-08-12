import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newAnecAction, initAnecsAction, voteAction, asObject } from './reducers/anecdoteReducer'
import { notiAction, removeNotiAction } from './reducers/notificationReducer'
import { filterChangeAction } from './reducers/filterReducer'
import axios from 'axios'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  function addNewAnecdote(e) {
    e.preventDefault();
    axios.post("http://localhost:3001/anecdotes", asObject(e.target["anecContent"].value))
      .then(result => {
        dispatch(newAnecAction(result.data));
      })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div><input name="anecContent" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecs)
  const filterContent = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    let anecdote = anecdotes.find(anec => {
      return anec.id == id;
    })
    anecdote.votes += 1;
    axios.put(`http://localhost:3001/anecdotes/${id}`, anecdote)
      .then(result => {
        dispatch(voteAction(result.data));
        dispatch(notiAction(content));
        let timeoutId=setTimeout(() => {
          dispatch(removeNotiAction());
        }, 3000);
        while(timeoutId--){
          clearTimeout(timeoutId);
        }
        
      })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => {
        return a.votes > b.votes ? -1 : 1;
      }).map((anecdote) => {
        if (anecdote.content.includes(filterContent)) {
          return <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        }
      }
      )}
    </div>
  )

}

const Notification = () => {
  const notification = useSelector(state => state.noti)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const Filter = () => {
  let dispatch = useDispatch();
  function handleChange(e) {
    dispatch(filterChangeAction(e.target.value));
  }

  let style = {
    margin: 5
  }

  return (<input style={style} type="text" name="anecFilter" id="anecFilter" onChange={handleChange} />)
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:3001/anecdotes").then(result => {
      dispatch(initAnecsAction(result.data));
    })
  }, [])

  return (
    <div>
      {useSelector(state => state.noti) && <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App