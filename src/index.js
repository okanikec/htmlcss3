const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
require('./db/mongoose')
const { generateMessage, generateLocationMessage } = require('./utils/messages')


const auth = require('./middleware/auth')
const pagesRouter = require('./routers/pages')
const teamateRouter = require('./routers/teamates')
//const chatServer = require('../public/js/chatserver')



const hbs = require('hbs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { send } = require('@sendgrid/mail')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(teamateRouter)
app.use(pagesRouter)
//app.use(chatServer)

let count = 0 
const serverConnection = io.on('connection', (socket) => {
    console.log('New Websocket connection eh')

    socket.emit('message', generateMessage('welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user has joined!'))

    socket.on('sendMessage',( message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }

        io.emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'))
    })

    
})


server.listen ( port, (socket) => {
    console.log('Server is up on port ' + port)
})

