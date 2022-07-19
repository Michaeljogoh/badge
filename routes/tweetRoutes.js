const express = require('express');
const app = express();
const router = express.Router();
const {createTweet , getTweets , deleteTweets , updateTweets , likeTweets , unLikeTweets ,reTweets, unReTweets } = require('../controllers/TweetController');
const { ensureAuthorizated } = require('../middeware/authorization')




router.get('/' , getTweets);

router.post('/tweets', ensureAuthorizated, createTweet);

router.patch('/:id', ensureAuthorizated,  updateTweets);

router.delete('/:id',  ensureAuthorizated, deleteTweets);

router.put('/likes',ensureAuthorizated , likeTweets);

router.put('/unlikes',ensureAuthorizated , unLikeTweets);

router.post('/retweets', ensureAuthorizated , reTweets);

router.delete('/unretweets' , ensureAuthorizated , unLikeTweets);











module.exports = router;