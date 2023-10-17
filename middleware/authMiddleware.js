const jwt = require("jsonwebtoken")

const authRequire = (req , res , next) => {
    // get jwt from cookie
    const token = req.cookies.jwt

    //check if jwt exist in cookie
    if (token) {
        // jwt token exist in cookie so will verifie if it's matched and there are no problem
        const tokenExist = jwt.verify(token , 'web site secure token' , (decodedToken , error) => {
            //if there is an error will redirect to login
            if(error) {
                console.log(error.message)
                return res.status(404).json({url : "redirect to login jwt issue"})
            }else {
                //if there is a token and it's matched with the user so will
                //redirect to specific url that user need
                console.log(decodedToken)
                next()
            }
        })
    }else {
        //if it's not the site wile force redirect the user to login page
        return res.status(404).json({url : "redirect to login token no exist"})
    } 
}
module.exports = {authRequire}