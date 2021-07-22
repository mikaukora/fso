import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateNew = async (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreateNew}>
        <div>
          title
          <input
            type="text"
            id='title'
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            id='author'
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            id='url'
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submit-button' type="submit">create</button>
      </form>
    </div>
  );
};

CreateForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default CreateForm;