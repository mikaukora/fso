const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1, id:1 });
  response.json(blogs.map(blog => blog.toJSON()));
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  // Temporarily pick the first one
  const someUser = await User.findOne({});

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author,
    user: someUser._id
  }
  );

  const savedBlog = await blog.save();
  console.log('someUser; ', someUser);
  someUser.blogs = someUser.blogs.concat(savedBlog._id);
  await someUser.save();
  response.status(201).json(savedBlog.toJSON());
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
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