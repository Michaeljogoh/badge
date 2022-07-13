const express = require('express');
const app = express();
const router = express.Router();
const {createComments} = require('../controllers/CommentController');
const { ensureAuthorizated } = require('../middeware/authorization')

router.post('/Comments' , ensureAuthorizated, createComments);



module.exports = router;