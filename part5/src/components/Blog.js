import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Blog = ({blog, onLike, currentUser, onRemove}) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => setShowDetails(!showDetails);

  const handleLike = (blog) => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    onLike(updatedBlog);
  };

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      onRemove(blog);
    }
  }

  const deleteButton = (blog) => {
    if (blog.user.username === currentUser) {
      return <button onClick={() => handleRemove(blog)} >Remove</button>
    }
    return null;
  }

  const titles = () => ( <div style={blogStyle}> {blog.title} {blog.author}  <button onClick={toggleDetails}>view</button></div> );

  const details = () => (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button onClick={toggleDetails}>hide</button>
      <p>{blog.url}</p>
      <p> likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
      <p> {blog?.user?.name}</p>
      {deleteButton(blog)}
      </div>
    );

  return (
    <div>
    {showDetails ? details() : titles()}
    </div>
  )
}

Blog.propTypes = {
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog