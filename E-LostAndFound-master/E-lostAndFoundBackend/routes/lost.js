import express from "express";
const router = express.Router();

import mongoose from "mongoose";
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Product from "../models/Lost.js";
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  
  
  router.post("/", upload.single('file'), (req, res, next) => {
      const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        place: req.body.place,
        typeob: req.body.typeob,
        descp: req.body.descp,
        productImage: {
            data: fs.readFileSync(path.join('C:/Users/Praneeth/Desktop/somename/E-LostAndFound/E-lostAndFoundBackend/' + '/public/' + req.file.filename)),
            contentType: 'image/png'
        }
      });
      product
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Created product successfully",
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/lost/" + result._id
                }
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });

    router.get('/', (req, res) => {
    

        Product.find((err, data) => {
            if(err){
                res.status(500).send(err)
            }
            else{
                // const items = data.map(x => x.item)
                res.status(200).send(data)
            }
    
        })
    })
    
    router.get('/:id', (req, res) => {
        Product.find({_id: req.params.id}, (err, data) => {
            if(err){
                res.status(500).send(err)
            }
            else{
                console.log("sds")
                res.status(200).send(data[0])
            }
        })
    })

export default router