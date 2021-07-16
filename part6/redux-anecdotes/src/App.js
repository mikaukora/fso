import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    const vote = dispatch(addVote(id));
    console.log('vote', vote);
  }

  const sortByVotes = (objs) => [...objs].sort((a,b) => (a.votes > b.votes) ? -1 : a.votes < b.votes ? 1 : 0);
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
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
    </div>
  )
}

export default App;
