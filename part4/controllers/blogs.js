const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1, id:1 });
  response.json(blogs.map(blog => blog.toJSON()));
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.user);

  if (!user) {
    response.status(401).json({ error: 'Invalid user or token missing' });
  }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author,
    user: user._id
  }
  );

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON());
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === request.user) {
    console.log('Correct user deleting');
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    console.log('Denied: wrong user');
    response.status(401).json({ error: 'Only own blog entries can be deleted' });
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const res = await Blog.findByIdAndUpdate(
    request.params.id,
    body,
    { new: true, runValidators: true }
  );

  response.status(201).json(res.toJSON());
});

module.exports = blogsRouter