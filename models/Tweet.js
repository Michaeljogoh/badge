const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const TweetSchema = new mongoose.Schema({
    
    content:{
        type: String,
        required: true,
    },
    postBy:{
        type: ObjectId,
        ref:"Users"

    }
})

const Tweets = mongoose.model('Tweets', TweetSchema)
module.exports = Tweets;