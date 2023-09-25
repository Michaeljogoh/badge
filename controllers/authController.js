const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring')


// Sign Up
const register = async (req , res)  =>{
const {name , email ,  password , password2 } = req.body;
    //Validation
    if(!name || !email  || !password || !password2 ){
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


const newUser = new Users({name , email ,  password , password2})
        //Hash password
        bcrypt.genSalt(10 , ( err , salt)=>
             bcrypt.hash(newUser.password, salt , async ( err , hash) =>{
                if(err) throw err;
                newUser.password = hash
                // save 
                await newUser.save();
                res.status(200).json({newUser});
            })
        )

    }

    
   
    


// Sign In
const login = async  (req , res ) =>{
    
    const {email , password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
  await Users.findOne({email})
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



const sendForgetPasswordMail = async ( email , token) =>{
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            post:587,
            secure:false,
            requireTLS: true,
            auth:{
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS

            }
        })
      const mailOptions = {
        from:process.env.EMAIL_USER,
        to:  email,
        subject:"Reset Password",
        html:'<p>Please copy the link below and your <a href="http://localhost:3000/auth/reset-password?token='+ token +'">reset password</a>'
      }

     transporter.sendMail(mailOptions ,function(err , info){
        if(err){
        console.log(err)
        }  else{
            console.log('email has been sent')
            console.log(info)
        }

     })
      
    } catch (error) {
         console.log(error)
    }
}



const forgetPassword =  async (req , res) =>{
    try {
        const  email  = req.body.email;
        const userData =  await Users.findOne({ email: email  });
        if(userData){
            const randomString = randomstring.generate();
            const data = await Users.updateOne({email:email}, {$set:{token: randomString}});
            sendForgetPasswordMail(userData.email, randomString)
            res.status(200).json({success:'Check your inbox, to reset password'})
        } else{
            res.status(404).json({success:'User does not exists'})
        }
        
    } catch (error) {
        console.log(error)
    }

}
const securePassword = async (password) =>{
    try {
      const passwordHash =   await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (error) {
        console.log(error)
    }
}


const resetPassword =  async (req , res) =>{
try {
    const token = req.query.token;
 const tokenData = await Users.findOne({token:token});
 if(tokenData){
    const password = req.body.password
  const newPassword =  await securePassword(password);
  await Users.findByIdAndUpdate({_id: tokenData._id},{$set:{password: newPassword, token:''}},{new: true})
  res.status(300).json({msg:'User password has been reset, Login now'})
 } else{
    res.status(400).json({msg:'This link has expired'})
 }
    
} catch (error) {
    console.log(error)
}
}

module.exports = {register , login , forgetPassword , resetPassword}