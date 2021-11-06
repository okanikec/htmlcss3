const data = require('../routers/teamates')
const stuff = require('./data')

//console.log(data.loggedInTeamate)

const generateMessage = (text) => {
    return {
        text,
        username: stuff[0].username,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (url) => {
    return {
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}