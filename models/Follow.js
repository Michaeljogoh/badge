const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types

const followSchema = new mongoose.Schema({

    followers:{
        type:ObjectId,
        ref:"Users"
    },
    following:{
        type:ObjectId,
        ref:"Users"
     }
})

const Follow = mongoose.model('Follow' , followSchema)
module.exports = Follow