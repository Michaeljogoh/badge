const Comment = require('../models/Comment');


const createComments = async (req , res) =>{
    const { comment } = req.body
    if(!comment){
        res.status(422).json({error:"Please write a comment"})
    } 
  const newcomment =  await  Comment.create({comment , tweetId:req.params.id, commentBy : req.user })
    res.status(200).json({newcomment})

}

// getPostBlog paginational
const getComments = async ( req , res ) =>{
  const {page = 1 , limit = 5} = req.query
 const  getComments = await Comment.find()
 .populate("commentBy", "name") 
 .limit(limit * 1)
 .skip((page - 1) * limit)
 .exec();

//Get total tweets
const count = await Comment.countDocuments();
res.status(200).json({getComments , totalPages:Math.ceil(count / limit), currentPage: page})

}


module.exports = {createComments  , getComments}