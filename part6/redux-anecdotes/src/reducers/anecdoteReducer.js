import anecdoteService from '../services/anecdotes';

export const addVote = (id) => {
  return async (dispatch, getState) => {
    const {anecdotes} = getState();
    const anecdoteToChange = anecdotes.find(n => n.id === id);
    const changed = {...anecdoteToChange, votes: anecdoteToChange.votes + 1};
    const updatedAnecdote = await anecdoteService.updateVote(id, changed);
    dispatch( {
      type: 'VOTE',
      data: updatedAnecdote,
    });
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch( {
      type: 'NEW',
      data: newAnecdote,
    });
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes,
    });
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data);
    case 'NEW':
      return [...state, action.data];
    case 'INIT':
      return action.data;
    default:
      return state
  }
}

export default reducer