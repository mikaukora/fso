import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState({});

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    console.log('effect', loggedUserJSON);
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

  const handleCreateNew = async (event) => {
    event.preventDefault();

    console.log('handleCreateNew called', title, author, url);
    console.log('blogs', blogs);
    try {
      await blogService.create({ title, author, url });
      const updatedBlogs = await blogService.getAll();
      setBlogs( updatedBlogs );
      showNotification(`a new blog ${title} by ${author} added`);
      setTitle('');
      setAuthor('');
      setUrl('');
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

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
      <div>
        <h3>create new</h3>
        <form onSubmit={handleCreateNew}>
          <div>
            title
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
              <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
              <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>

      </div>
      <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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