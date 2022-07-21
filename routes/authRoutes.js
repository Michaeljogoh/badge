const express = require('express');
const app = express();
const router  = express.Router();
const {register, login , changePassword , logout} = require('../controllers/authController');
const { ensureAuthorizated } = require('../middeware/authorization')

router.post('/register' , register);

router.post('/login', login);

router.post('/new_password', ensureAuthorizated, changePassword);

router.get('/logout', logout )




module.exports = router;