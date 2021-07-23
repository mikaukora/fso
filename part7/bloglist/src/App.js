import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import CreateForm from './components/CreateForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs, addBlog, addLike, deleteBlog } from './reducers/blogReducer';
import { login, logout, loggedInUser } from './reducers/loginReducer';
import blogService from './services/blogs';


const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    /* user stored in localStorage */
    dispatch(loggedInUser());
  }, [dispatch]);

  useEffect(() => {
    blogService.setToken(user?.token);
  }, [user]);

  const handleLogin = async ({ username, password }) => {
    dispatch(login({ username, password }));
  };

  const handleLogout = () => {
    dispatch(logout(user));
  };

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
      {user === null ? <LoginForm onLogin={handleLogin}></LoginForm> : blogList()}
    </div>
  );
};

export default App;