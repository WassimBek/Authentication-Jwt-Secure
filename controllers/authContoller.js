const User = require("../models/user")
const jwt = require("jsonwebtoken")
const handelError = (err) => {
    let errors = {
        email : null ,
        password : null
    }
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }
    
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const maxDay = 3 * 24 * 60 * 60 //three days

const createToken = (id) => {
    //trying to create token
    return jwt.sign({id} , 'web site secure token' , {
        expiresIn: maxDay ,
    })
}

module.exports.singup_get = (req , res) => {
    return res.status(200).json({message : "Singup Page"})
}

module.exports.login_get = (req , res) => {
    return res.status(200).json({message : "Login Page"})
}


module.exports.singup_post = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({email : email , password : password});
        const token = createToken(user._id)
        res.cookie("jwt" , token , {httpOnly : true , maxAge : maxDay * 1000})
        res.status(201).json({user : user._id});
    } catch (error) {
        const errors = handelError(error)
        return res.status(400).json({ errors });
    }
}

module.exports.login_post = (req , res) => {
    return res.status(200).json({message : "Check User"})
}