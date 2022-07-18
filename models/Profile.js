const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    name:{
        type: String,
      
    },

    bio:{
        type: String,
     
    },
     
    birthday:{
        type: Date,
    }
})

const Profile = mongoose.model('Profile' , ProfileSchema)
module.exports = Profile;