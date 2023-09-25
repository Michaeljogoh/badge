const Users = require('../models/Users');
const jwt = require('jsonwebtoken');


const ensureAuthorizated = async (req , res , next) =>{

const {authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must login to access this page" })
    }
    try {
 const token = authorization.replace('Bearer', '')

const verify =  jwt.verify(token , process.env.JWT_SECRET, async (payload)=>{
     
const {_id} = payload

const userdata = await Users.findById(_id)
        req.user = userdata
        next()
    })
        
    } catch (error) {
     res.status(400).json('Invalid token')   
    }


}


module.exports = { ensureAuthorizated }