const logger = require('./logger')
const jwt = require('jsonwebtoken')
const {SECRET} = require('./config.js')
const {ActiveSession} = require('../models')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}


const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  } else if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({error: error.message})
  } else if (error.name === "SequelizeDatabaseError") {
    return res.status(400).send(`Error: ${error.message}`)
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  }

  next(error)
}


const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    let token = req.decodedToken
    try {
      token = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({error: 'token invalid'})
    }
    const activeSession = await ActiveSession.findByPk(token.jti)
    if (!activeSession) {
      return res.status(401).send({error: "session expired"})
    }
    
  } else {
    return res.status(401).json({error: 'token missing'})
  }
  next()
}


module.exports = {
  requestLogger, unknownEndpoint, errorHandler, tokenExtractor
}
