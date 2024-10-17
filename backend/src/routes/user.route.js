const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.controller')

router.get('/register', userControllers.getRegister)
router.post('/register', userControllers.postRegister)
router.get('/login', userControllers.getLogin)
router.post('/login', userControllers.postLogin)
router.get('/:id', userControllers.getUser)
router.put('/:id', userControllers.updateUser)
router.delete('/:id', userControllers.deleteUser)

module.exports = router;