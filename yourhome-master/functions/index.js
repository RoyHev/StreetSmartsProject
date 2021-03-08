const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const cors = require('cors')({ origin: true })
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
})

exports.submit = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return
    }

    const mailOptions = {
      from: req.body.email,
      replyTo: req.body.email,
      to: gmailEmail,
      subject: `התקבלה הודעה מ: ${req.body.name}`,
      text: req.body.message,
      html: `<p> ${req.body.message}</p> <p>טלפון: ${req.body.phone} </p> <p>אימייל: ${req.body.email} </p>`,
    }

    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New email sent to:', gmailEmail)
      res.status(200).send({ isEmailSend: true })
      return
    })
  })
})