const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  logger.info(blog);

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((err) => next(err));
})

module.exports = blogsRouter