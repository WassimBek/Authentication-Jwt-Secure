const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")
const userSchema =new mongoose.Schema({
    email : {
        type : String ,
        required : [true , 'this field is required'] ,
        unique : true ,
        lowercase : true ,
        validate : [isEmail , 'enter a valid email']
    },
    password : {
        type : String ,
        required : true ,
        minLength : [6 , 'minimum character is 6']
    },
})

//middlewar (pre and post hooks)


userSchema.post('save' ,function (doc , next) {
    console.log('this happend after saving user in mongo db' , doc)
    next() 
})


// i need this pre hook for hashing my password before save it in db for secure
userSchema.pre('save' ,async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)
    console.log('this happend before saving a user in mongo db' , this)
    next()
})

//static method

//after login i need to check if the account exist
userSchema.statics.login = async(email , password) => {
    //fist of all finding the user with email
    const user = await User.findOne({email : email})
    if (user) {
        //if the user exist then i need to compare the password if it's maching
        // but don't forget that you save the password in hash mso u need to 
        // hash the password of the login first and check if it's mach with the password that storing in mongo db
        // you can use that with compare methode 
        const auth = await bcrypt.compare(password , user.password)
        if(auth)
            return user
        throw  Error('incorrect password')
    }
    throw  Error('email not found')
}

const User = mongoose.model('user' , userSchema)

module.exports = User