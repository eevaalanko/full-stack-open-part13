const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')
const ActiveSession = require('./activesession')

User.hasMany(Blog)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readinglists' })

// Blog.sync({alter: true})
// User.sync({alter: true})


module.exports = {
  Blog, User, ReadingList, ActiveSession
}