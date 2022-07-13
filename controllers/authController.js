const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign Up
const signUp = async (req , res)  =>{
    const {name , email , username , password , password2 } = req.body;
    //Validation
    if(!name , !email , !username , !password, !password2 ){
        res.status(422).json({error:"Please fill in all field"})
    }

    if(password !== password2){
        res.status(422).json({error:"password does not match"})

    }

    if(password < 6){
       res.status(422).json({error:"password must not be less than six characters"})
    }
    
    await  Users.findOne({email : email})
    .then(user =>{
      if(user){
        res.status(422).json({error:"Email already registered"})
      } else {

const newUser = new Users({name , email , username ,  password , password2})

        //Hash password

        bcrypt.genSalt(10 , ( err , salt )=>
            bcrypt.hash(newUser.password, salt , async ( err , hash) =>{
                if (err) throw err;
                newUser.password = hash
                // save 
                await newUser.save();
                res.status(200).json("Registered");
            })
        )


      }
    })
    

}
// Sign In

const signIn = async  (req , res ) =>{
    const {username , password} = req.body;
    if(!username  || !password){
        res.json(422).json({error:'Incorrect Password!!!'})
    }
    
    await Users.findOne({username : username})
    .then(savedUser =>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or  password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(isMatch =>{
            if(isMatch){
                const token = jwt.sign({_id:savedUser._id}, process.env.JWT_SECRET)
                res.status(200).json({token})
            } else {
                return res.status(422).json({error:"Invalid email or  password"})
            }
        })
        .catch(err => console.log(err))
    });

}

module.exports = {signUp , signIn}