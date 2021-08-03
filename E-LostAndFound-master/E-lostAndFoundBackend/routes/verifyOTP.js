import express from 'express'
const router = express.Router()
import User from "../models/User.js"

router.post('/', (req,res) => {
    const OTP = req.body.OTP 
    const id = req.body.user_id
    console.log(id)
    console.log(OTP)
    User.find({_id:id}, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            console.log(data)
            if(data[0].otp == OTP){
                User.updateOne({_id:id}, {verified: true, otp:"Verified"}, (err, data) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log(data)
                    }
                })

                res.status(200).json({msg:'Correct otp'})
            }
            else{
                res.status(400).json({msg:'\tWrong OTP, try again'})
            }
        }
    })

})

export default router;