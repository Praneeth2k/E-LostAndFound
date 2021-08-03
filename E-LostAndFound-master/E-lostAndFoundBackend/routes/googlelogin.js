import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import config from 'config'
import jwt from 'jsonwebtoken'
import auth from "../middleware/auth.js"

import User from '../models/User.js'

import pkg from "google-auth-library";
const {OAuth2Client} = pkg;
const CLIENT_ID = "337044747904-ajjq5h0hp7ijobge2a8j6ulqachn52j5.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);


router.post('/',(req,res) => {
    const token = req.body.idtoken
    console.log(token)
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
      }
      verify().catch(console.error);
    const { name, email, password } = req.body
    // Simple validation
    if(!email || !password) {
        return res.status(400).json({msg:'Please enter all the fields'})
    }

    // Check for existing user
    User.findOne({ email })
      .then(user => {
          
          if(!user) {
            const newUser = new User({
                name,
                email,
                password
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
          }
          else{
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
          }
          
        })


})

export default router