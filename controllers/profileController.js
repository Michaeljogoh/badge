const Profile = require('../models/Profile');


const createProfile =  async (req , res) =>{
    const {name , bio , birthday } = req.body;
    const newProfile = await Profile.create({name , bio , birthday})
    res.status(200).json({newProfile})

}

module.exports = {createProfile}