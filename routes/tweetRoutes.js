const express = require('express');
const app = express();
const router = express.Router();
const {createTweet} = require('../controllers/TweetController')


router.post('/tweets',  createTweet);




module.exports = router;