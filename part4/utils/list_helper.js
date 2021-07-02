const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  if (blogs) {
    const total = blogs.reduce((acc, blog) => acc + blog.likes, 0);
    return total;
  }
  return 0;
}

const favoriteBlog = (blogs) => {
  if (blogs && blogs.length) {
    const favorite = blogs.reduce((acc, blog) => blog.likes > acc.likes ? blog : acc);
    return { title: favorite.title, author: favorite.author, likes: favorite.likes };
  }
  return {};
}

const mostBlogs = (blogs) => {
  if (blogs && blogs.length) {

    const byAuthor = blogs.reduce((acc, blog) => {
      if (blog.author in acc) {
        acc[blog.author].blogs += 1;
      }else {
        acc[blog.author] = { author: blog.author, blogs: 1 };
      }
      return acc;
    },{});

    const mostBlogs = Object.values(byAuthor).reduce((acc, blog) => blog.blogs > acc.blogs ? blog : acc);
    return mostBlogs;
  }
  return {};
}

const mostLikes = (blogs) => {
  if (blogs && blogs.length) {
    const byAuthor = blogs.reduce((acc, blog) => {
      if (blog.author in acc) {
        acc[blog.author].likes += blog.likes;
      } else {
        acc[blog.author] = { author: blog.author, likes: blog.likes }
      }
      return acc;
    },{});

    const mostPopular = Object.values(byAuthor).reduce((acc, author) => author.likes > acc.likes ? author : acc);
    return mostPopular;
  }
  return {};
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
