const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require('express-jwt') // for authorisatin check

const {errorHandler} = require( "../helpers/dbErrorHandler");

exports.signup = (req, res)=>{
    //console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user)=>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });

    });
};
exports.signin = (req, res)=>{
//find the user based on email
const {email, password} = req.body
User.findOne({email}, (err, user)=>{
if(err || !user){
   return res.status(400).json({
       err: "User with  that email does not exist. Please sign up"
   })
}
// if user is found make sure the email and assword match
// create authenticate method in user model 
//generate a signed token with user id and secret
})
};

