const express = require ('express');
const router = express.Router();
const User = require('../Models/User');


router.post('/',async(req,res)=>{
    let user = await User.findOne({email: req.body.email})
    if(user) {
      return  res.status(200).send(user)
    }
    
      user =new User(req.body);
     user.save((err,savedUser)=>{
        if(err) return res.status(400).send('Cannot create account');
          else  return res.status(201).send(savedUser);
    });
  })


  module.exports = router;