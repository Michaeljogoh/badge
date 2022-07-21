const Likes = require('../models/Like');


const likeTweets = async (req , res ) =>{
      const newLike =  await  Likes.create({ like:req.params.id, user:req.user._id })
      res.status(200).json({newLike})
    }

  
    const unLikeTweets = async (req , res ) =>{
  const newUnlike =  await Likes.findByIdAndDelete(req.params.id)
      res.status(200).json({newUnlike})
    }

     
      
    


module.exports = {likeTweets , unLikeTweets}
