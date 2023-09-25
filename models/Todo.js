const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const TodoSchema = new mongoose.Schema({
    
    content:{
        type: String,
        required: true,
    },

})

const Todo = mongoose.model('Todo', TodoSchema)
module.exports = Todo;