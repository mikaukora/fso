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

module.exports = {
  dummy,
  totalLikes
}