const express = require('express');
const app = express();
const router = express.Router();
const { createProfile } = require('../controllers/profileController');
const { ensureAuthorizated } = require('../middeware/authorization');

router.post('/profile' , ensureAuthorizated, createProfile);





module.exports = router;