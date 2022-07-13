const express = require('express');
const app = express();
const router = express.Router();
const {createComments , getComments} = require('../controllers/CommentController');
const { ensureAuthorizated } = require('../middeware/authorization')

router.post('/:id' , ensureAuthorizated, createComments);

router.get('/' , ensureAuthorizated , getComments);



module.exports = router;