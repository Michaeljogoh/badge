const express = require('express');
const app = express();
const router = express.Router();
const {createTweet , getTweets , deleteTweets , updateTweets , likeTweets , unLikeTweets} = require('../controllers/TweetController');
const { ensureAuthorizated } = require('../middeware/authorization')




router.get('/' , getTweets);

router.post('/tweets', ensureAuthorizated, createTweet);

router.patch('/update/:id', ensureAuthorizated,  updateTweets);

router.delete('/delete/:id',  ensureAuthorizated, deleteTweets);

router.put('/likes',ensureAuthorizated ,likeTweets);

router.put('/unlikes',ensureAuthorizated ,unLikeTweets);







module.exports = router;