const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    postBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users"

    }
})

const Tweets = mongoose.model('Tweets', PostSchema)
module.exports = Tweets;