const supertest = require('supertest')
const app = require('../app')
const api = supertest(app);
const User = require('../models/user');


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const addUser = async (user) => {
  await api
    .post('/api/users')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  let r = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  return { ...user, token: r.body.token }
}

module.exports = {
  usersInDb,
  addUser
}