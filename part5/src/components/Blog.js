import React, {useState} from 'react';

const Blog = ({blog, onLike}) => {
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

  const titles = () => ( <div style={blogStyle}> {blog.title} {blog.author}  <button onClick={toggleDetails}>view</button></div> );
  const details = () => (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <p>{blog.url}</p>
      <p> likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
      <p> {blog?.user?.name}</p>
      <button onClick={toggleDetails}>hide</button>
      </div>
    );

  return (
    <div>
    {showDetails ? details() : titles()}
    </div>
  )
}

export default Blog