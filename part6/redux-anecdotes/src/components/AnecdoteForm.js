
import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {

  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const anecdote = dispatch(addAnecdote(content));
    console.log('anecdote', anecdote);

    showNotification(dispatch, 'New anecdote added');
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm;
