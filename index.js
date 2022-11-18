const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json())

// Error Handler  ()

const accountSid = 'AC612b2d61cd96d532ac1a7ab6d9e4494b'
const authToken = 'a57c67bea7ecd534e82d1752c6b60e98'
const client = require('twilio')(accountSid, authToken)

app.post('/twilio', (req, res) => {
  client.messages.create({
    body: 'je suis un message',
    from: '+13854386517',
    to: '+243979527648',
  })
})

const nodemailer = require('nodemailer')

app.post('/message', async (req, res) => {
  const { to, message, subject } = req.body
  console.log('je suis dedans')
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: 'jeremie2018mihigo@gmail.com',
      pass: 'iavepmgvxeuypxnj',
    },
  })

  let info = await transporter.sendMail({
    from: 'jeremie2018mihigo@gmail.com',
    to: to,
    subject: subject,
    text: message,
    html: `<b>${message}</b>`,
  })
  console.log(info.messageId)
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log('server running ' + PORT))

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error :${err}`)

  server.close(() => process.exit(1))
})
