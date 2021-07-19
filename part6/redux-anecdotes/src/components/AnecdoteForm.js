
import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const anecdote = props.addAnecdote(content);
    console.log('anecdote', anecdote);

    props.showNotification('New anecdote added', 5);
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

const mapDispatchToProps = {
    addAnecdote,
    showNotification
  }

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm);
