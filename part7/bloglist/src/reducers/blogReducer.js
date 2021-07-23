import blogService from '../services/blogs';

export const addBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content);
    dispatch( {
      type: 'NEW',
      data: newBlog,
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch( {
      type: 'DELETE',
      data: blog.id,
    });
  };
};


export const addLike = (blog) => {
  return async (dispatch) => {
    const changed = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(changed);
    dispatch( {
      type: 'LIKE',
      data: updatedBlog,
    });
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data: blogs,
    });
  };
};

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
  case 'LIKE':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data);
  case 'NEW':
    return [...state, action.data];
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id);
  case 'INIT':
    return action.data;
  default:
    return state;
  }
};

export default reducer;