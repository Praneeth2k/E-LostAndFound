import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import config from 'config'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

// Mail part
import nodemailer from 'nodemailer'

function generateOTP() { 
          
    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
} 

const OTP = generateOTP().toString()

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elostfound204@gmail.com',
      pass: 'karjpraan@2020'
    }
  });
  
  var mailOptions = {
    from: 'BMSCE Lost and Found <elostfound204@gmail.com>',
    to: '',
    subject: 'BMSCE lost and found verification OTP',
    text: `Your OTP is ${OTP}`
  };


router.post('/',(req,res) => {
    const { name, email, password} = req.body
    // Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'})
    }
    // Check for existing user
    User.findOne({ email })
      .then(user => {
          if(user) return res.status(400).json({msg: "User already exists"})

          if(!email.endsWith("@bmsce.ac.in")){
              return res.status(400).json({msg:"Please enter bmsce mail Id only"})
          }
          if(password.length < 6){
            return res.status(400).json({msg:"Password must be at least 6 characters long"})
          }
          const newUser = new User({
              verified: false,
              name,
              email,
              password,
              otp: OTP
          })

          // Create salt and hash
          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash)=> {
                  if(err) throw err
                  newUser.password = hash
                  newUser.save()
                    .then(user => {

                        jwt.sign(
                            { id: user.id, name: user.name },
                            config.get('jwtSecret'),
                            { expiresIn: 1800 },
                            (err, token) => { 
                                if(err) throw error

                                mailOptions.to = user.email
                                console.log(mailOptions)

                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                    console.log(error);
                                    } else {
                                    console.log('Email sent: ' + info.response);
                                    }
                                });
                                

                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                }) 
                            }
                        )
                        
                    })
                    //send mail with otp
                    

              })
          })
        })
})


export default router