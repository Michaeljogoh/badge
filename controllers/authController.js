const Users = require('../models/Users');
const bcrypt = require('bcrypt');


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
                res.status(200).json({newUser});
            })
        )


      }
    })
    

}

const signIn = async  (req , res ) =>{

}

module.exports = {signUp , signIn}