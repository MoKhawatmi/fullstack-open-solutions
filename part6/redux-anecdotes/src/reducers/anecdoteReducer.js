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