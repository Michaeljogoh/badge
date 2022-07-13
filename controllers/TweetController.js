const Tweets = require('../models/Tweet');


const createTweet = async (req , res ) =>{
    const {content } =  req.body;
    if(!content){
        res.status(422).json({error:"Please fill in the field"})

    }
    const newPost = await Tweets.create({content , postBy : req.user })
    res.status(200).json("Tweet Created!!!")
   

}
// getPostBlog paginational
const getTweets = async ( req , res ) =>{
    const {page = 1 , limit = 5} = req.query
   const  getTweets = await Tweets.find()
   .populate("postBy", "name") 
   .limit(limit * 1)
   .skip((page - 1) * limit)
   .exec();

//Get total tweets
const count = await Tweets.countDocuments();
res.status(200).json({getTweets , totalPages:Math.ceil(count / limit), currentPage: page})

}




// update
const updateTweets = async (req, res) => { 
    const newTweet = await Tweets.findById(req.params.id);
    if (newTweet?.postBy === req.body.postBy) {
        const updatedPost = await Tweets.findByIdAndUpdate(req.params.id,{ $set: req.body, },{ new: true });
        res.status(200).json({updatedPost});   
    } else {
      res.status(401).json("You can update only your post!");
    }

  }

    // Delete
const deleteTweets = async (req , res) =>{
    const newTweet = await Tweets.findById(req.params.id);
    if (newTweet?.postBy === req.body.postBy) {
        await Tweets.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted...");
      }else {
      res.status(401).json("You can delete only your post!");
    }
 
  }

  const likeTweets = async (req , res ) =>{
  await Tweets.findByIdAndUpdate(req.body.tweetId, {
      $push:{likes:req.user._id}
    }, {new: true})
    res.status(200).json('Liked')
  }

  const unLikeTweets = async (req , res ) =>{
   await Tweets.findByIdAndUpdate(req.body.tweetId, {
      $pull:{likes:req.user._id}
    }, {new: true})
    res.status(200).json('UnLiked')
  }
 


module.exports = {createTweet , getTweets , deleteTweets , updateTweets , likeTweets , unLikeTweets}
