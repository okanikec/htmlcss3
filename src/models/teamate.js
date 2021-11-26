const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const teamateSchema = new mongoose.Schema({
    email: {
        type: String,
        //required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    country: {
        type: String,
        //required: true,
        trim: true
    },
    password: {
        type: String,
        //required: true,
        trim: true
    },
    confirmpass: {
        type: String,
        //required: true,
        trim: true,
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "Passwords are not the same",
        }
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
})

teamateSchema.methods.toJSON = function () {
    const teamate = this
    const teamateObject = teamate.toObject()

    delete teamateObject.password
    delete teamateObject.confirmpass
    delete teamateObject.tokens

    return teamateObject
}

//generate Authentication Token
teamateSchema.methods.generateAuthToken = async function () {
    const teamate = this
    const token = jwt.sign({_id: teamate._id.toString()}, 'thisismynewcourse')

    teamate.tokens = teamate.tokens.concat({token})
    await teamate.save()

    return token
}

// login with email and password
teamateSchema.statics.findByCredentials = async (email, password) => {
    const teamate = await Teamate.findOne({ email })

    if(!teamate) {
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, teamate.password)


    if (!isMatch) {
        throw new Error('unable to login')
    }

   

    return teamate
}




//hash plain text password before saving
teamateSchema.pre('save', async function (next) {
    const teamate = this
   
    if (teamate.isModified('password'))
    {
        teamate.password = await bcrypt.hash(teamate.password, 8)
        teamate.confirmpass = await bcrypt.hash(teamate.confirmpass, 8)
    
        
    }

    next()
})


const Teamate = mongoose.model('Teamate', teamateSchema )

module.exports = Teamate