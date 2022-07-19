const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Sign Up
const register = async (req , res)  =>{
const {name , email , username , password , password2 } = req.body;
    //Validation
    if(!name || !email || !username || !password || !password2 ){
        res.status(422).json({error:"Please fill in all field"})
    }

    if(password !== password2){
        res.status(422).json({error:"password does not match"})

    }

    if(password < 6){
       res.status(422).json({error:"password must not be less than six characters"})
    }
    
const newEmail = await Users.findOne({email : email })

    if (newEmail){
        res.status(422).json({error:"Email already registered"})
      } 

const newUser = await Users.findOne({username : username})

    if(newUser){

        res.status(422).json({error:"Username already exists!"})


    }  else {
const newUser = new Users({name , email , username ,  password , password2})
        //Hash password
        bcrypt.genSalt(10 , ( err , salt)=>
             bcrypt.hash(newUser.password, salt , async ( err , hash) =>{
                if(err) throw err;
                newUser.password = hash
                // save 
                await newUser.save();
                res.status(200).json("Registered");
            })
        )

    }

    }
   
    


// Sign In
const login = async  (req , res ) =>{
    
    const {username , password} = req.body
    if(!username || !password){
       return res.status(422).json({error:"please add email or password"})
    }
  await Users.findOne({username:username})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET , {expiresIn : '1d'})
               res.status(200).json({token})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })



}






const logout = async (req , res) =>{
    res.cookie("jwt" , "")

}





const changePassword = async (req , res) =>{
  
  const {authorization} = req.headers;

  const {  newPassword } = req.body;

  const token = authorization.replace("Bearer ","");

  const user = jwt.verify(token , process.env.JWT_SECRET)
  
  const _id = user._id

  const  password = await bcrypt.hash(newPassword , 10)
  
  const update =  await Users.updateOne({_id},{$set:{ password}})

  res.status(200).json({update})
    

}
module.exports = {register , login , changePassword, logout}