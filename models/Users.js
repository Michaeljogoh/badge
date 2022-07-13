const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },

    date:{
    type:Date,
    default :Date.now
    }
})

const Users = mongoose.model('Users', UserSchema)
module.exports  = Users;