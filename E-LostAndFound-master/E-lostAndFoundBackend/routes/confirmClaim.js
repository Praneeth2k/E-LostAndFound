import express from 'express'
const router = express.Router()

import nodemailer from 'nodemailer'


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elostfound204@gmail.com',
      pass: 'karjpraan@2020'
    }
  });
  
  var mailOptionsLost = {
    from: 'BMSCE Lost and Found <elostfound204@gmail.com>',
    to: '',
    subject: 'Hurray! Someone found your item',
    html: ``

  };
  var mailOptionsFound = {
    from: 'BMSCE Lost and Found <elostfound204@gmail.com>',
    to: '',
    subject: 'Someone has claimed the item you found',
    text: `Your OTP is `
  };

  router.post('/', (req, res)=>{
      const { lostEmail, foundEmail } = req.body
      
      // Sending mail to the person who claimed the item
      mailOptionsLost.to  = lostEmail
      mailOptionsLost.html = `<h2>Details of the person who had found your item ${foundEmail}</h2> 
      <h3>Contact them and collect your item</h3>
      `
      transporter.sendMail(mailOptionsLost, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });

    // Sending mail to the person who had found the item
    mailOptionsFound.to = foundEmail
    mailOptionsFound.html = `<h2>Here are the details of the person is claiming the item you found</h2>
            <h3>email: ${lostEmail}</h3>
            <p>Regards, bmsce E-lost and found</p>

    `
    transporter.sendMail(mailOptionsFound, function(error, info){
      if (error) {
      console.log(error);
      } else {
      console.log('Email sent: ' + info.response);
      }
    }

    );





  })

export default router




