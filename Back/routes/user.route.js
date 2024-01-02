const express = require('express')
const AdminUserSchema = require('../models/user.model')
const bcrypt = require('bcrypt')
const multer = require('multer')
const fs = require('fs')

const router = express.Router()




// File Uploading :-

const imagePathWay = "./assets/images/users"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${imagePathWay}`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage }).single('pic')


router.post('/register', (req, res)=>{
    

    upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).json({status : 500, msg : err.message})
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(501).json({status : 501, msg : err.message})
    }

    const {email, password, name} = req.body;

    const pic = req.file.filename;
    if(!email || !password || !name){
        console.log('unlinking file....!!')
        fs.unlink(`${imagePathWay}/pic`)
        return res.status(400).json({status : 400 , msg : "Please Fill The Feild"})
    }
    bcrypt.hash(password, 12, (err, hashPass)=>{
        if(err){
            console.log('unlinking file....!!')
            fs.unlink(`${imagePathWay}/pic`)
            return res.status(500).json({status : 500 , msg : err.message})
        }
        if(!hashPass){
        console.log('unlinking file....!!')
        fs.unlink(`${imagePathWay}/pic`)
        return res.json({status : 500, msg : "Something Went Wrong...!!"})
        }
        let insUser = new AdminUserSchema({email, password : hashPass, name, pic})

        insUser.save().then(data=>{
            return res.json({status : 200, msg : "Inserted Successfully"})
        }).catch(err=>{
            console.log('unlinking file....!!')
            fs.unlink(`${imagePathWay}/pic`)
            return res.json({status : 500, msg : err.message})
        })
        

    })

    
})
})


router.post('/login', (req, res)=>{
    const {email, pass} = req.body;
    if(!email || !pass){
        return res.json({status : 400 , msg : "Please Fill The Feild"})
    }

        AdminUserSchema.findOne({email}, (err, data)=>{
            if(err)
            return res.status(500).json({status : 500, msg : "Something went wrong"})
            if(!data)
            return res.status(404).json({status : 404, msg : 'User not found'})
            

            let dbPass = data.Password;

            bcrypt.compare(pass, dbPass, (err, valid)=>{
                if(err){
                    return res.status(200).json({status : 500, msg: err.message})
                }
                if(!valid){
                    return res.status(404).json({status : 404, msg : "User not found"})
                }
                return res.json({status : 200, msg : "Logged in"})
            })
        })
})


router.get('/', (req, res)=>{
    AdminUserSchema.find({}, (err, data)=>{
        if(err)
        return res.status(500).json({status : 500, msg : err.message})
        if(data.length == 0){
            return res.json({status : 200, msg : 'No user found'})
        }
        return res.json({status : 200, msg : data})
    })
})


router.put(`/password`, (req, res)=>{
    const {oldPass, newPass, email} = req.body;

    AdminUserSchema.findOne({email}, (err, data)=>{
        if(err) return res.status(500).json({status : 500, msg : err.message})
        if(!data) return res.status(404).json({status : 404, msg : "User not found"})

        bcrypt.compare(oldPass, data.password, (err, valid)=>{
            if(err){
                return res.status(501).json({status : 501, msg : err.message})
            }
            if(!valid){
                return res.status(420).json({status : 420, msg : "Password Mismatch"})
            }
            
            bcrypt.hash(newPass, 12, (err, hashPass)=>{
                if(err){
                    return res.status(503).json({status : 503, msg : err.message})
                } 
                if(!hashPass){
                    return res.status(505).json({status : 505, msg : "Something went wrong"})
                }


                AdminUserSchema.findOneAndUpdate({email}, {password : hashPass}, (err, result)=>{
                    if(err){
                        return res.status(504).json({status : 504, msg : err.message})
                    }

                    if(!result){
                        return res.status(506).json({status : 506, msg : "Something went wrong"})
                    }
                    return res.json({status : 200, msg : "Updated Successfully.....!!"})

                })

            })
        })
    })
})

module.exports = router;