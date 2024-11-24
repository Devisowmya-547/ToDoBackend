const express = require('express')
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const userApp = express.Router()

userApp.post('/signup', async (req, res) => {
  const {email, pass} = req.body
  const password = await bcryptjs.hash(pass, 7)
  try{
    const newUser = new User({email, password})
    await newUser.save()
    res.send({message : "Registration successful"})
  }catch{
    res.send({message : "EMail already registered"})
  }
})

userApp.put('/login', async (req, res) => {
  const {email, pass} = req.body
  const user = await User.findOne({email: email})
  if(user == null) {return res.send({message : "User not found"})}
  const passCheck = await bcryptjs.compare(pass, user.password)
  if(passCheck === false) { return res.send({message : 'Invalid password'})}
  res.send({message : 'exist', user : user})
})

module.exports = userApp