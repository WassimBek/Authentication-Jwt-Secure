const User = require("../models/user")


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
        return res.status(201).json(user);
    } catch (error) {
        const errors = handelError(error)
        return res.status(400).json({ errors });
    }
}

module.exports.login_post = (req , res) => {
    
    return res.status(200).json({message : "Check User"})
}