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

    if(err.message === 'email not found') {
        errors.email = 'that email is not registered'
    }
    if(err.message === 'incorrect password') {
        errors.password = 'incorrect password'
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
        return res.status(201).json({user : user._id})
    } catch (error) {
        const errors = handelError(error)
        return res.status(400).json({ errors });
    }
}

module.exports.login_post = async(req , res) => {
    try {
        const {email , password} = req.body 
        // use login methode that i created in user.js file  to check if the user exist
        const user = await User.login(email , password)
        const token = createToken(user._id)
        res.cookie("jwt" , token , {httpOnly : true , maxAge : maxDay * 1000})
        console.log(req.cookies)
        return res.status(200).json({user : user._id})
    } catch (error) {
        const errors = handelError(error)
        return res.status(400).json({error : errors})
    }
}

module.exports.logout_get = (req , res) => {
    // when we logout we need to delete that jwt from the cookies
    // but we can't do that so we need to change the value from the cookies
    // of jwt 
    res.cookie('jwt' , '' , {maxAge : 1})
    // after we delete the cookies we need to redirect to login page
    res.status(200).json({url : "redirect to login page"})
}