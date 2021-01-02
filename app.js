// install necessary packages — express and nodemailer 
// npm install express nodemailer --save

const nodemailer = require('nodemailer');
var express = require('express');

var app = express();
var port = process.env.PORT || 3002;

//get all data from Google API console

var auth = {
    type: 'oauth2',
    user: 'GMAIL_ADDRESS',
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    refreshToken: 'REFRESH_TOKEN',
};

app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());

//AJAX calls on our express app
/ OCRS request

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/send', function(req, res){
  response = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  }
  
  
  var mailOptions = {
      from: req.body.name,
      to: 'ajinkya23muley@gmail.com',
      subject: 'My site contact from: ' + req.body.name,
      text: req.body.message,
      html: 'Message from: ' + req.body.name + '<br></br> Email: ' +  req.body.email + '<br></br> Message: ' + req.body.message,
  };
var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: auth,
  });
transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
          return console.log(err);
      } else {
          console.log(JSON.stringify(res));
      }
  });
})
// starting the server
app.listen(port);