const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    console.log("ok")
    bcrypt.hash(req.body.password, 10, function(err,hashedPass){
        if(err){
            res.json({
               error:err 
            })
        }
        let user = new User({
            username:req.body.username,
            password:req.body.hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                message: "User add!"
            }).catch(error => {
                res.json({
                    message: "Error"
                })
            })
        })
    })
}

module.exports = register;