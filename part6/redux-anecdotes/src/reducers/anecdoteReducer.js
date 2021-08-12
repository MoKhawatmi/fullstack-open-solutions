/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export function initAnecsAction(content) {
  return ({
    type: "ANEC_INIT",
    data: {
      content
    }
  })
}

export function newAnecAction(content) {
  return ({
    type: "NEW_ANEC",
    data: {
      content
    }
  })
}

export function voteAction(votedObject) {
  return ({
    type: "VOTE",
    data: {
      votedObject
    }
  })
}

//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log("orig reducer");
  switch (action.type) {
    case "VOTE":
      let newState = state.map(anec => {
        return anec.id != action.data.votedObject.id ? anec : action.data.votedObject;
      })
      return newState;
    case "NEW_ANEC":
      let newAnec = action.data.content;
      return state.concat(newAnec);
    case "ANEC_INIT":
      return action.data.content;
    default:
      return state;
  }
}

export default reducer