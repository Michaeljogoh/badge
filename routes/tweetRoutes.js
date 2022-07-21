const express = require('express');
const app = express();
const router = express.Router();
const {createTweet , getTweets , deleteTweets , updateTweets , reTweets, unReTweets } = require('../controllers/TweetController');
const { ensureAuthorizated } = require('../middeware/authorization')




router.get('/' , getTweets);

router.post('/tweets', ensureAuthorizated, createTweet);

router.patch('/:id', ensureAuthorizated,  updateTweets);

router.delete('/:id',  ensureAuthorizated, deleteTweets);

router.post('/retweets', ensureAuthorizated , reTweets);

router.delete('/unretweets/:id' , ensureAuthorizated , unReTweets);











module.exports = router;