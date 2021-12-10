const jwt = require('jsonwebtoken')
const Teamate = require('../models/teamate')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies['auth_token']
        //const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_ENV)
        const teamate = await Teamate.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!teamate) {
            throw new Error()
        }

        req.token = token
        req.teamate = teamate
        next()
    } catch (e) {
        res.status(401).send({error: 'Please Autenticate'})
        //res.redirect('/home')
    }

}

module.exports = auth