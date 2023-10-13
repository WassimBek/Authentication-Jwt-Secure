const express = require("express")
const mongoose =  require("mongoose")
const authRouter = require("./Routes/auth")
const app = express()
const cookieParser = require("cookie-parser")
const PORT = 8080 || process.env.PORT

app.use(express.json())
app.use(cookieParser())
const dbUri = "mongodb+srv://Wassim:Wassim_Bekh@cluster0.pgakkh6.mongodb.net/Smothie-Jwt"
mongoose.connect(dbUri)
        .then( response => app.listen(PORT , ()=> console.log("server is runing on "+ PORT)))
        .catch(err => console.log(err))
app.use("/auth" , authRouter)

// Set cookies 

app.get("/set-cookies" , (req , res) => {
        //use this , install cookie-parser package
        //maxAge Proprtie is the time that the cookies need to stay in the website
        //because by default the cookies gone after close the browser
        res.cookie('newUser' , false , {maxAge : 1000*60*60*24 , httpOnly:true})
        //httpOnly : true mean i can't access to my cookies or modified by the client side
        //1000ms * 60s * 60m * 24h === 1d
        res.cookie('isEmployee' , true).send('set data to cookies is done')
        //or this 
        // res.setHeader('Set-Cookies' , 'newUser = false')
})

app.get('/read-cookies' , (req , res) =>{
        const cookies = req.cookies
        console.log(cookies.newUser)
        return res.status(200).send(cookies)
})
