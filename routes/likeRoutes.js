const express = require('express');
const app = express();
const router  = express.Router();
const {likeTweets , unLikeTweets} = require('../controllers/likeController')
const { ensureAuthorizated } = require('../middeware/authorization')

router.put('/likes/:id',ensureAuthorizated , likeTweets);

router.put('/unlikes/:id',ensureAuthorizated , unLikeTweets);




module.exports = router;