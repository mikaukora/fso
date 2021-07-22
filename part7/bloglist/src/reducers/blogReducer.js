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
  case 'NEW':
    return [...state, action.data];
  case 'INIT':
    return action.data;
  default:
    return state;
  }
};

export default reducer;