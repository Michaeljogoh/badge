const express = require('express');
const app = express();
const router  = express.Router();
const {signUp, signIn} = require('../controllers/authController');


router.post('/signup' , signUp );

router.post('/signin', signIn);




module.exports = router;