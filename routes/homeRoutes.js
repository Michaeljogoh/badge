const express = require('express');
const app = express();
const router = express.Router();
const { getTweets } = require('../controllers/TweetController');


router.get('/' , getTweets);



module.exports = router;