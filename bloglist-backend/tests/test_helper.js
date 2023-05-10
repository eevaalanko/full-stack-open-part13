const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'koirablogi',
    author: 'snoopy',
    url: 'http://whoff.com',
    likes: 101,
  },
  {
    title: 'sota ja rauha',
    author: 'tolstoi',
    url: 'http://jokublogi.com',
    likes: 1,
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog(  {
    title: 'willRemove',
    author: 'thissoon',
    url: 'http://sooon.com',
    likes: 0,
  },)
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, usersInDb, nonExistingId, blogsInDb
}