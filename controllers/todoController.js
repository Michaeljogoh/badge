const Todo = require('../models/Todo');


const createTodo = async (req , res ) =>{
    const {content } =  req.body;
    if(!content){
        res.status(422).json({error:"Please fill in the field"})

    }
    const newTodo = await Todo.create({content  })
    res.status(200).json({newTodo})
   

}
// paginational
const getTodo = async ( req , res ) =>{
    const {page = 1 , limit = 5} = req.query
   const  getTodo = await Todo.find()
   .limit(limit * 1)
   .skip((page - 1) * limit)
   .exec();
//Get total tweets
const count = await Todo.countDocuments();
res.status(200).json({getTodo , totalPages:Math.ceil(count / limit), currentPage: page})
}



module.exports = {createTodo, getTodo }
