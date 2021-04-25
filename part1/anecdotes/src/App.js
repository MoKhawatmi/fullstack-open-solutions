import React, { useState } from 'react'

const Button=(props)=>{
  return(<button onClick={props.handleClick}>{props.name}</button>)
}

const MostVotes=(props)=>{
  return(<div>
    <h2>Anecdote with the most votes</h2>
    <p>{props.maxVoted[1]}</p>
    <p>Has {props.maxVoted[0]} votes</p>
  </div>)
}

const App = () => {
  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState(false);
  const [votes , setVotes] = useState({});
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  function generateRandom(){
    let anecdote=Math.floor(Math.random() * (anecdotes.length - 0) + 0);
    setSelected(anecdote);
  }

  function vote(){
    let originalVotes=votes[selected] || 0;
    let newObject={};
    Object.assign(newObject,votes);
    newObject[selected]=originalVotes+1;
    setVotes(newObject);
    setVoted(true);
  }
  
  function findMax(votes){
    let reduced =Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
    return [votes[reduced],anecdotes[reduced]];
  }
  
  return (
    <div>
      <Button handleClick={generateRandom} name="Generate anecdote" />
      <Button handleClick={vote} name="Vote" />
      <p>{anecdotes[selected]}</p>
      <p>{votes[selected]||0}</p>
      {voted && <MostVotes maxVoted={findMax(votes)} />} 
    </div>
  )
}

export default App