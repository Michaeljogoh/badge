const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types

const LikeSchema = new mongoose.Schema({

    like:{
        type: ObjectId,
        ref:"Tweet"

        },

    user:{
        type: ObjectId,
        ref:"Users"
    }

})

const Like = mongoose.model('Like' , LikeSchema)
module.exports = Like