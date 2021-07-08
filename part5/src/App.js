import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import CreateForm from './components/CreateForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({});

  const sortByLikes = (objs) => [...objs].sort((a,b) => (a.likes > b.likes) ? -1 : a.likes < b.likes ? 1 : 0);

  const sortAndUpdateBlogs = (blogs) => {
    const sorted = sortByLikes(blogs);
    setBlogs(sorted);
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      sortAndUpdateBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      showNotification('wrong username or password', true);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }

  const loginForm = () => (
    <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
  )

  const addBlog = async (blog) => {
    try {
      blogListRef.current.toggleVisibility();
      await blogService.create(blog);
      const updatedBlogs = await blogService.getAll();
      sortAndUpdateBlogs( updatedBlogs );
      showNotification(`a new blog ${blog.title} by ${blog.author} added`);
    } catch (exception) {
      console.log('error when creating blog');
    }
  }

  const showNotification = (msg, error = false) => {
    setNotification({ message: msg, error: error });
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  const blogListRef = useRef();

  const handleLikeUpdate = async (blog) => {
    console.log(blog);
    await blogService.update(blog);
    const updatedBlogs = await blogService.getAll();
    sortAndUpdateBlogs(updatedBlogs);
    showNotification(`blog ${blog.title} by ${blog.author} updated, now ${blog.likes} likes `);
  }

  const handleBlogRemove = async (blog) => {
    console.log("removing blog", blog);
    await blogService.remove(blog);
    const updatedBlogs = await blogService.getAll();
    sortAndUpdateBlogs(updatedBlogs);
    showNotification(`blog ${blog.title} by ${blog.author} removed`);
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
      <Togglable buttonLabel='create new blog' ref={blogListRef}>
        <CreateForm
          createBlog={addBlog}
          ></CreateForm>
      </Togglable>
      <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLike={handleLikeUpdate} currentUser={user.username} onRemove={handleBlogRemove}/>
      )}
      </div>
    </div>
  )

  return (
    <div>
      <Notification message={notification} />
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App