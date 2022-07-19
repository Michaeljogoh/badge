const jwt = require('jsonwebtoken');
const Users = require('../models/Users');


const ensureAuthorizated = async (req , res , next) =>{
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({error: "You must login in"})
    }
const token = authorization.replace("Bearer ","")
  jwt.verify(token , process.env.JWT_SECRET , async (err , payload ,) =>{
        if(err){
            return res.status(401).json({error:"You must login in"})
        }
const {_id} = payload

const userdata = await Users.findById(_id)
        req.user = userdata
         next()
       })

} 

module.exports = { ensureAuthorizated }