const express = require('express');
const router = express.Router();
const { createTodo ,getTodo } = require('../controllers/TodoController')
const { ensureAuthorizated } = require('../middeware/authorization')


router.get('/' ,  ensureAuthorizated , getTodo);

router.post('/todo', ensureAuthorizated, createTodo );



module.exports = router;