/* eslint-disable no-undef  */
require('dotenv').config()
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  console.log('operation returned the following blogs', blogs)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let blog = {}
  let requ = request.body


  console.log('request ', request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(403).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  requ.likes === undefined
    ? (blog = new Blog({
      title: requ.title,
      author: requ.author,
      url: requ.url,
      user: user._id,
      likes: 0,
    }))
    : (blog = new Blog({
      title: requ.title,
      author: requ.author,
      url: requ.url,
      user: user._id,
      likes: requ.likes,
    }))

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.populate('user', { username: 1, name: 1 }))
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (blog.user.toString() !== decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'user is not writer of that blog' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })

  response.json(updatedBlog)
})

module.exports = blogsRouter
