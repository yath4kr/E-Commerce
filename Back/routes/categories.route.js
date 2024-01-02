const express = require('express')
const CategorySchema = require('../models/categories.model')
const multer = require('multer')
const fs = require('fs')

const router = express.Router()




// File Uploading :-

const imagePathWay = "./assets/images/categories"

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


router.post('/add-cat', (req, res)=>{
    

    upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).json({status : 500, msg : err.message})
    } else if (err) {
      // An unknown error occurred when uploading.
      ses.status(501).json({status : 501, msg : err.message})
    }

    const {title, description} = req.body;

    const pic = req.file.filename;
    if(!title || !description){
        console.log('unlinking file....!!')
        fs.unlink(`${imagePathWay}/${pic}`)
        return res.status(400).json({status : 400 , msg : "Please Fill The Feild"})
    }
   
        let insUser = new CategorySchema({title, description, pic})

        insUser.save().then(data=>{
            return res.json({status : 200, msg : "Inserted Successfully"})
        }).catch(err=>{
            console.log('unlinking file....!!')
            fs.unlink(`${imagePathWay}/${pic}`)
            return res.json({status : 500, msg : err.message})
        })
        

    })

    
})




router.get('/', (req, res)=>{
    CategorySchema.find({}, (err, data)=>{
        if(err)
        return res.status(500).json({status : 500, msg : err.message})
        if(data.length == 0){
            return res.json({status : 200, msg : 'No category found'})
        }
        return res.json({status : 200, msg : data})
    })
})

router.delete('/delete/:_id', (req, res)=>{
    const {_id} = req.params
    CategorySchema.findByIdAndDelete({_id}, (err, data)=>{
        if(err)
        return res.status(500).json({status : 500, msg : err.message})
        if(!data)
        return res.status(500).json({status : 500, msg : err.message})
        console.log(data)
        const{pic} = data
        fs.unlink(`${imagePathWay}/${pic}`, (err)=>{
          if(err){
            console.log(err.message)
          }else{
            console.log(`The image has been deleted...!!`)
          }
        })
        return res.json({status : 200, msg : "Deleted"})

    })
})
module.exports = router;