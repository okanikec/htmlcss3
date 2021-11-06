const stuff = require('../utils/data')

exports.getList = (req, res, next) => {
    res.render('jist',{
        user1: stuff[0].username,
        user2: stuff[1].username,
        user3: stuff[2].username,
        email1: stuff[0].email,
        email2: stuff[1].email,
        email3: stuff[2].email,
    })
}

exports.getUser = (req, res, next) => {
    res.render('chat',{
        username: stuff[0].username,
    })
}