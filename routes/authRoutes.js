const express = require('express');
const app = express();
const router  = express.Router();
const { ensureAuthorization } = require('../middeware/authorization')
const {signUp, signIn} = require('../controllers/authController');

router.get('/hello' , ensureAuthorization , (req , res)=>{
    res.send("we are the ruler")
})

router.post('/signup' , signUp );

router.post('/signin', signIn);




module.exports = router;