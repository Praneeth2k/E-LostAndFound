import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import config from 'config'
import jwt from 'jsonwebtoken'
import auth from "../middleware/auth.js"

import User from '../models/User.js'



router.post('/',(req,res) => {
    const { email, password } = req.body
    // Simple validation
    if(!email || !password) {
        return res.status(400).json({msg:'Please enter all the fields'})
    }

    // Check for existing user
    User.findOne({ email })
      .then(user => {
          // if normal login
          if(!user) return res.status(400).json({msg: "E-mail isn't registered"})
          // else if google login
            // register this user

          // Validate password
          bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'})
                
                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 43200 },
                    (err, token) => {
                        if(err) throw error
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
          
        })


})

router.get('/', auth, (req, res) => {

    User.findById(req.user.id)
      .select("-password")
      .then(user => res.status(200).json(user))
      
})


export default router

// router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
//     if (req.user) {
//       var token = authenticate.getToken({_id: req.user._id});
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/json');
//       res.json({success: true, token: token, status: 'You are successfully logged in!'});
//     }
//   });