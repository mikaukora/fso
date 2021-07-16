
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    const vote = dispatch(addVote(id));
    console.log('vote', vote);
  }

  const sortByVotes = (objs) => [...objs].sort((a,b) => (a.votes > b.votes) ? -1 : a.votes < b.votes ? 1 : 0);

  return (
    <div>
        {sortByVotes(anecdotes).map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
    </div>
    )
}

export default AnecdoteList;
