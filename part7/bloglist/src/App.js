import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import CreateForm from './components/CreateForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs, addBlog, addLike, deleteBlog } from './reducers/blogReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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
      });

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(showNotification('wrong username or password', true));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            id='username'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            type="password"
            id='password'
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  );

  const addABlog = async (blog) => {
    try {
      blogListRef.current.toggleVisibility();
      dispatch(addBlog(blog));
      dispatch(showNotification(`a new blog ${blog.title} by ${blog.author} added`));
    } catch (exception) {
      dispatch(showNotification('error when creating blog', true));
    }
  };

  const blogListRef = useRef();

  const handleLikeUpdate = async (blog) => {
    dispatch(addLike(blog));
    dispatch(showNotification(`blog ${blog.title} by ${blog.author} updated`));
  };

  const handleBlogRemove = async (blog) => {
    dispatch(deleteBlog(blog));
    dispatch(showNotification(`blog ${blog.title} by ${blog.author} removed`));
  };

  const sortByLikes = (objs) => [...objs].sort((a,b) => (a.likes > b.likes) ? -1 : a.likes < b.likes ? 1 : 0);

  const sortedList = (l) => sortByLikes(l);

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
      <Togglable buttonLabel='create new blog' ref={blogListRef}>
        <CreateForm
          createBlog={addABlog}
        ></CreateForm>
      </Togglable>
      <div>
        {sortedList(blogs).map(blog =>
          <Blog key={blog.id} blog={blog} onLike={handleLikeUpdate} currentUser={user.username} onRemove={handleBlogRemove}/>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <Notification />
      {user === null ? loginForm() : blogList()}
    </div>
  );
};

export default App;