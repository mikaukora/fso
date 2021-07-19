
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const viewFilter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const vote = async (id) => {
    const vote = dispatch(addVote(id));
    console.log('vote', vote);
    dispatch(showNotification('Anecdote voted', 2));
  }

  const sortByVotes = (objs) => [...objs].sort((a,b) => (a.votes > b.votes) ? -1 : a.votes < b.votes ? 1 : 0);

  const filteredAnecdotes = (objs, filter) => {
      if (!filter) {
        return objs;
      }
      return objs.filter((p) => p.content.toLocaleLowerCase().includes(filter));
  };

  const finalList = () => {
    const filtered = filteredAnecdotes(anecdotes, viewFilter);
    return sortByVotes(filtered);
  }

  return (
    <div>
        {finalList().map(anecdote =>
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
