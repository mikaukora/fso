const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

describe('get blogs', () => {
  const initialBlogs = [
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    },
  ]

  beforeEach(async () => {
    await Blog.deleteMany({});
    let noteObject = new Blog(initialBlogs[0]);
    await noteObject.save();
    noteObject = new Blog(initialBlogs[1]);
    await noteObject.save();
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  })

  test('there are correct amount of notes', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.map(r => r.title);

    expect(response.body).toHaveLength(initialBlogs.length);
    expect(titles).toEqual(
      ['Type wars', 'Canonical string reduction']
    );
  })

  test('id field has correct name', async () => {
    const response = await api.get('/api/blogs');

    const firstBlog = response.body[0];
    expect(firstBlog.id).toBeDefined();
    expect(firstBlog._id).not.toBeDefined();
  })

  const blog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }

});

describe('post blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  })

  const blog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  };

  const blogWithoutTitle = {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  };

  const blogWithoutUrl = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    likes: 2,
  };

  test('blogs can be added', async () => {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const titles = response.body.map(r => r.title);

    expect(response.body).toHaveLength(1);
    expect(titles).toEqual(
      ['Type wars']
    );
  });

  test('blog without title can not be added', async () => {
    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/);

  });

  test('blog without url can not be added', async () => {
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/);

  });
});

describe('likes', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  })

  const blog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  }

  test('like gets default value', async () => {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const likes = response.body[0].likes;

    expect(response.body).toHaveLength(1);
    expect(likes).toEqual(0);
  })
});

describe('delete blogs', () => {
  const initialBlogs = [
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    },
  ]

  beforeEach(async () => {
    await Blog.deleteMany({});
    let noteObject = new Blog(initialBlogs[0]);
    await noteObject.save();
    noteObject = new Blog(initialBlogs[1]);
    await noteObject.save();
  });

  test('blogs can be deleted', async () => {
    let response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(2);
    const blogsIds = response.body.map((b) => b.id);
    const idToDelete = blogsIds[0];

    response = await api
      .delete(`/api/blogs/${idToDelete}`)
      .expect(204);

    response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(1);
    const remainingBlogsIds = response.body.map((b) => b.id);
    expect(remainingBlogsIds).toEqual(
      [blogsIds[1]]
    );
  });

});

describe('update blogs', () => {
  const initialBlogs = [
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    },
  ]

  beforeEach(async () => {
    await Blog.deleteMany({});
    let noteObject = new Blog(initialBlogs[0]);
    await noteObject.save();
    noteObject = new Blog(initialBlogs[1]);
    await noteObject.save();
  });

  test('likes can be updated', async () => {
    let response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body[0].likes).toEqual(2)
    const blogsIds = response.body.map((b) => b.id);
    const idToUpdate = blogsIds[0];

    response = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send({ likes: 1000 })
      .expect(201);

    response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const updatedLikes = response.body.map((b) => b.likes);
    expect(updatedLikes).toEqual(
      [1000, initialBlogs[1].likes]
    );

    expect(response.body[0].likes).toEqual(1000);
  });

});


afterAll(() => {
  mongoose.connection.close();
})