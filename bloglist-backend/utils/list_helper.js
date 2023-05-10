const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) =>
  blogs.length === 0
    ? 0
    : blogs.reduce((amount, blog) => amount + blog.likes, 0)

const favoriteBlog = (blogs) =>
  blogs.length === 0
    ? null
    : blogs.reduce((prev, current) =>
      +prev.likes > +current.likes ? prev : current
    )

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authors = _.groupBy(blogs, 'author')
  const max = _.values(authors).reduce(function (a, b) {
    return a.length > b.length ? a : b
  })
  const author = Object.keys(authors).find((key) => authors[key] === max)
  return { author, blogs: max.length }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const authors = _.entries(_.groupBy(blogs, 'author'))
  const sorted = authors.map((a) =>
    a[1].length > 1
      ? {
        author: a[0],
        likes: a[1].reduce((prev, current) => prev.likes + current.likes),
      }
      : { author: a[0], likes: a[1][0].likes }
  )

  const max = Math.max(...sorted.map((v) => v.likes))

  return sorted.find((s) => s.likes === max)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
