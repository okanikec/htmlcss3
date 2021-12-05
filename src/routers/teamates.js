const express = require('express')
const Teamate = require('../models/teamate')
const auth = require('../middleware/auth')
const router = new express.Router()
const loggedInTeamate = []


//postman create new teamate 
router.post('/teamates', async (req, res) => {
    const teamate = new Teamate(req.body)

    try {
        await teamate.save()
        const token = await teamate.generateAuthToken()
        res.status(201).send({ teamate, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// HTML create new teamate
// router.post('/teamates', async (req, res) => {
//     const teamate = new Teamate(req.body)
//     try {
//         await teamate.save()
//         const token = await teamate.generateAuthToken()
//         res.cookie('auth_token', token)
//         res.redirect('/home')
//     } catch(e) {
//         res.status(400).send(e)
//     }
// })

//postman login 
router.post('/teamates/login', async (req, res) => {
    try {
        const teamate = await Teamate.findByCredentials(req.body.email, req.body.password)
        const token = await teamate.generateAuthToken()
        res.send({teamate, token})
    } catch (e) {
        res.status(400).send(e)
    }
})


// HTML login 
// router.post('/teamates/login', async (req, res) => {
//     try {
//         const teamate = await Teamate.findByCredentials(req.body.email, req.body.password)
//         const token = await teamate.generateAuthToken()
//         res.cookie('auth_token', token)
//         res.redirect('/home')
//     } catch (e) {
//         res.status(400).send()
//     }
// })




//postman logout
router.post( '/teamates/logout', auth, async (req,res) => {
    try{
        req.teamate.tokens = req.teamate.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.teamate.save()

        res.send()
    } catch (e){
        res.status(500).send()
    }
})


//HTML logout
// router.post( '/teamates/logout', auth, async (req,res) => {
//     try{
//         req.teamate.tokens = req.teamate.tokens.filter((token) => {
//             return token.token !== req.token
//         })
//         await req.teamate.save()

//         res.send()
//     } catch (e){
//         res.status(500).send()
//     }
// })


//postman logout all
router.post('/teamates/logoutAll', auth, async (req, res) => {
    try {
        req.teamate.tokens = []
        await req.teamate.save()
        res.send()
    } catch(e){
        res.status(500).send()
    }
})


// HTML logout all
// router.post('/teamates/logoutAll', auth, async (req, res) => {
//     try {
//         req.teamate.tokens = []
//         await req.teamate.save()
//         res.send()
//     } catch(e){
//         res.status(500).send()
//     }
// })


//postman get your own profile
router.get('/teamates/me', auth, async(req, res) => {
    res.send(req.teamate)
})

//postman update teamate by ID
router.patch('/teamates/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email', 'country', 'password', 'confirmpass']  
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))  

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates'})
    }


    try {
        const teamate = await Teamate.findById(req.params.id)
        
        updates.forEach((update) => teamate[update] = req.body[update])
        await teamate.save()

        //const teamate = await Teamate.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!teamate) {
            return res.status(404).send()
        }

        res.send(teamate)
    } catch (e) {
        res.status(400).send(e)
    }

}) 

//postman delete teamate
router.delete('/teamates/:id', async (req, res ) => {
    try{
        const teamate = await Teamate.findByIdAndDelete(req.params.id)

        if(!teamate){
            return res.status(404).send()
        }

        res.send(teamate)
    } catch (e) {
        res.status(500).send()
    }

})

module.exports =  loggedInTeamate
module.exports = router
