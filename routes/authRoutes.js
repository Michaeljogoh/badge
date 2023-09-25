const express = require('express');
const app = express();
const router  = express.Router();
const {register, login , forgetPassword, resetPassword } = require('../controllers/authController');
const { ensureAuthorizated } = require('../middeware/authorization')

router.post('/register' , register);

router.post('/login', login);

router.post('/forget-password',  forgetPassword);
router.get('/reset-password', resetPassword);





module.exports = router;