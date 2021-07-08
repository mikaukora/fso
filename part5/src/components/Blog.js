import React, {useState} from 'react';

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => setShowDetails(!showDetails);

  const titles = () => ( <div style={blogStyle}> {blog.title} {blog.author}  <button onClick={toggleDetails}>view</button></div> );
  const details = () => (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <p>{blog.url}</p>
      <p> likes: {blog.likes} <button>like</button></p>
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