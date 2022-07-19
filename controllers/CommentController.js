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

const deleteComment = async (req , res) =>{
  const newDeleteComment = await Comment.findById(req.params.id)
  if(newDeleteComment.postBy._id.toString() === req.user._id.toString()){
    await Comment.findByIdAndDelete(req.params.id)
    res.status(200).json("Comment Deleted")
  } else {
    res.status(403).json("You can only delete your comment")
   }
 
  
}


module.exports = {createComments  , getComments , deleteComment}