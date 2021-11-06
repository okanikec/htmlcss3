// const express = require('express')
// const socketio = require('socket.io')
// const io = socketio()

// let count = 0 
// const serverConnection = io.on('connection', (socket) => {
//     console.log('New Websocket connection eh')

//     socket.emit('message', 'welcome!')
//     socket.broadcast.emit('message', 'A new user has joined!')

//     socket.on('sendMessage', (message, callback) => {
//         io.emit('message', message)
//         callback('Delivered!')
//     })

//     socket.on('sendLocation', (coords) => {
//         io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
//     })

//     socket.on('disconnect', () => {
//         io.emit('message', 'A user has left!')
//     })

    
// })

// module.exports = serverConnection