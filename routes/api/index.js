const userRoutes = require('./user')
const thoughtRoutes = require('./thought')
const router = require('express').Router()
router.use('/users', userRoutes)
router.use('/thoughts', thoughtRoutes)
module.exports = router