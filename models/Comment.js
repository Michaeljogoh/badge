const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
        
    comment:{
        type: String,
        required: true
    },
   
    postBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Comments = mongoose.model('Comments' , CommentSchema)
module.exports = Comments;