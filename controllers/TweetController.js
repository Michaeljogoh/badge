const Tweets = require('../models/Tweet');


const createTweet = async (req , res ) =>{
    const {content } =  req.body;
    if(!content){
        res.status(422).json({error:"Please fill in the field"})

    }
    const newPost = await Tweets.create({content , postBy : req.user })
    res.status(200).json({newPost})
   

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




// Update
const updateTweets = async (req, res) => { 
    const newTweet = await Tweets.findById(req.params.id);
    if(!newTweet){
      return res.status(422).json('Tweet Not Available')
    }
    if (newTweet?.postBy._id.toString() === req.user._id.toString()) {
        const updatedPost = await Tweets.findByIdAndUpdate(req.params.id,{ $set: req.body},{ new: true });
        res.status(200).json({updatedPost});   
    } else {
      res.status(401).json("You Can Update Only Your Post!");
    }

  }

// Delete
const deleteTweets  =  async (req , res) =>{
const newTweet = await Tweets.findById(req.params.id)
  if(!newTweet){
    return res.status(422).json('Tweet Not Available')
  }
  if(newTweet.postBy._id.toString() === req.user._id.toString()){
    await Tweets.findByIdAndDelete(req.params.id)
    res.status(200).json("Tweet Deleted")
  } else {
    res.status(403).json("You Can Delete Only Your Post!")
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




  const reTweets = async (req , res) =>{
      await Tweets.create({retweet :req.params.id ,  postBy: req.user } )
    res.status(200).json('Retweeted')


  }



const unReTweets = async (req , res) =>{
    await Tweets.findByIdAndDelete({retweet :req.params.id})
    res.status(200).json('UnRetweet')
  }
 


module.exports = {createTweet , getTweets , deleteTweets , updateTweets , likeTweets , unLikeTweets , reTweets , unReTweets }
