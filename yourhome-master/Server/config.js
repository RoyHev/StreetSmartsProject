const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
});

module.exports = transporter;