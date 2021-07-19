const getId = () => (100000 * Math.random()).toFixed(0)

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'NEW',
    data: {content, id: getId(), votes: 0}
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes,
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const anecdoteToChange = state.find(n => n.id === action.data.id);
      const changed = {...anecdoteToChange, votes: anecdoteToChange.votes + 1};
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : changed);
    case 'NEW':
      return [...state, action.data];
    case 'INIT':
      return action.data;
    default:
      return state
  }
}

export default reducer