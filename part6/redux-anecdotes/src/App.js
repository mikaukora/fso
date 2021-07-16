import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote, addAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    const vote = dispatch(addVote(id));
    console.log('vote', vote);
  }

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const anecdote = dispatch(addAnecdote(content));
    console.log('anecdote', anecdote);
  }

  const sortByVotes = (objs) => [...objs].sort((a,b) => (a.votes > b.votes) ? -1 : a.votes < b.votes ? 1 : 0);
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {sortByVotes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div votes={anecdote.votes}>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App;