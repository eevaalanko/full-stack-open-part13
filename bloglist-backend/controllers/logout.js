const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  await req.active_sessions.destroy()
  res.status(200).end()
})

module.exports = router