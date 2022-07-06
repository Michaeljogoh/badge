const Comment = require('../models/Comment');


const createComments = async (req , res) =>{
    const { comment } = req.body
    if(!comment){
        res.status(422).json({error:"Please write a comment"})
    } 

  const newcomment =  new Comment({comment , postBy: req.user})
  newcomment.save()
    res.status(200).json({newcomment})

}


module.exports = {createComments}