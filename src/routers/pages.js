const express = require('express')
const router = express.Router()
const dataController = require('../controllers/chatcontrol')


router.get('/',(req, res) => {
    res.render('index')
})

router.get('/home',(req, res) => {
    res.render('home')
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/chat', dataController.getUser)


router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/jist', dataController.getList)

router.get('/forgot', (req, res) => {
    res.render('forgot')
})

module.exports = router