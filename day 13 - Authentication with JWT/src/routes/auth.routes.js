const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const router = express.Router()


router.post('/register', async (req, res)=>{
      const {username, password} = req.body

      const user = await userModel.create({
            username, password
      })

      const token = jwt.sign({
            id:user._id,
      }, process.env.JWT_SECRET);
      res.cookie("token", token)
      res.status(201).json({
            message:"User Registered Successfully",
            user
      })
})



router.post('/login', async (req,res)=>{
      const {username, password} = req.body

      const user = await userModel.findOne({
            username: username
      })

      if(!user){
            return res.status(401).json({
                  message:"User Not Found [invalid user]"
            })
      }

      const isPasswordValid = password == user.password
       if (!isPasswordValid) {
         return res.status(401).json({
           message: "password Not Matching [invalid Password]",
         });
       }

       res.status(200).json({
            message:"User LoggedIn Successfully"
       })
})


router.get("/user", async (req,res)=>{
      const {token} = req.cookies

      if(!token){
            return res.status(401).json({
                  message:"Unauthorized"
            })
      }

      try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // res.send(decoded);

            const user = await userModel.findOne({
                  _id:decoded.id
            }).select("-password")

            res.status(200).json({
                  message:"User Data fetched Successfully",
                  user
            })
      } catch (error) {
            return res.status(401).json({
                  message:"Unauthorized"
            })
      }
      
})

module.exports= router