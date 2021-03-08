const path = require('path');
//adding the express library.
const express = require('express');
const transporter = require('./config');
const dotenv = require('dotenv');
dotenv.config()
//create the express app to handle the API requests.
const app = express();

const buildPath = path.join(__dirname, '..', 'build');
//setting up json parser to handle the form data that we are sending as a json in post request.
app.use(express.json());
app.use(express.static(buildPath));
//creating post request handler for /send endpoint so when we make API calls to /send url, this handler will be executed.
app.post('/send', (req, res) => {
  console.log(req.body);

  try{
      const mailOptions = {
        //   from: "Roy.hevrony@gmail.com",
        //   to: "yourhomereact@gmail.com",
        //   subject: "פנייה מהאתר",
        //   html: "This is what I want to write"
          //sender's address
          from: req.body.email, 
          //list of receivers
          to: process.env.email,
          //sender's phone number
        //   subject: "פנייה מאתר בית משלך",
        //   phoneNumber: req.body.phoneNumber,
          //plain text body
          subject: `${req.body.name} just messaged me from my website`,
          html: `<p>${req.body.message}</p>`,
      };
      transporter.sendMail(mailOptions, function(err, info){
          if (err) {
              res.status(500).send({
                  success: false,
                  message: 'Something went wrong. Try again later'
              });
          } else {
              res.send({
                  success: true,
                  message: 'Thanks for contacting us. We will get back to you shortly'
              });
          }
      });
  } catch (error){
      res.status(500).send({
          success: false,
          message: 'Something went wrong. Try again later'
      });
  }
});

//starting the express server to listen to our requests on port 3030
app.listen(3030, () => {
  console.log('server start on port 3030');
});