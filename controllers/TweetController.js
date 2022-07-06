const Post = require('../models/Tweet');

const createTweet = async (req , res ) =>{
    const {content } =  req.body;

    if(!content){
        res.status(422).json({error:"Please fill in the field"})

    }
    const newPost = await Post.create({content , post: req.params.id})
    res.status(200).json(newPost)
   

}





module.exports = {createTweet}
