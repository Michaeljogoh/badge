const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
        
    comment:{
        type: String,
        required: true
    },
   
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    commentBy:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:"Users"

    }
})

const Comment = mongoose.model('Comment' , CommentSchema)
module.exports = Comment;