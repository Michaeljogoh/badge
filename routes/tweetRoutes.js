const express = require('express');
const app = express();
const router = express.Router();
const {createTweet , getTweets , deleteTweets} = require('../controllers/TweetController');
const { ensureAuthorizated } = require('../middeware/authorization')




router.get('/' , getTweets);

router.delete('/',  ensureAuthorizated, deleteTweets)

router.post('/tweets', ensureAuthorizated, createTweet);






module.exports = router;