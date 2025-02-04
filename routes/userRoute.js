const { register, getAllUsers, getUser, deleteUser, login, update} = require('../controllers/userController')
const express = require('express')
const router = express.Router()

router.post('/register', register)
router.get('/users', getAllUsers)
router.delete('/users/:firstname', getUser, deleteUser)
router.get('/users/:firstname', getUser, login)
router.patch('/users/:firstname', getUser, update)

module.exports = router