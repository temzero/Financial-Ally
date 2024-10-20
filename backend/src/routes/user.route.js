const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.controller')

router.get('', userControllers.getHome)
router.get('/register', userControllers.getRegister)
router.post('/register', userControllers.postRegister)
router.get('/login', userControllers.getLogin)
router.post('/login', userControllers.postLogin)
router.get('user/:id', userControllers.getUser)
router.put('user/:id', userControllers.updateUser)
router.delete('user/:id', userControllers.deleteUser)

module.exports = router;