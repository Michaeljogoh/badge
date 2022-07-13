const Tweets = require('../models/Tweet');


const createTweet = async (req , res ) =>{
    const {content } =  req.body;

    if(!content){
        res.status(422).json({error:"Please fill in the field"})

    }
    const newPost = await Tweets.create({content , postBy : req.user })
    res.status(200).json(newPost)
   

}

// getPostBlog paginational
const getTweets = async ( req , res ) =>{
    const {page = 1 , limit = 5} = req.query
   const  getTweets = await Tweets.find()
   .populate("postBy", "_id name") 
   .limit(limit * 1)
   .skip((page - 1) * limit)
   .exec();

//Get total tweets
const count = await Tweets.countDocuments();
res.status(200).json({getTweets , totalPages:Math.ceil(count / limit), currentPage: page})

}

// Delete
const deleteTweets = async (req , res) =>{
        await Tweets.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted...");
    }
 






module.exports = {createTweet , getTweets , deleteTweets}
