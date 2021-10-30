const sgMail = require('@sendgrid/mail')
const { shadow } = require('jimp')
const { SENDGRID_KEY } = process.env

sgMail.setApiKey(SENDGRID_KEY)

const sendEmail = async(data) => {
  const email = { ...data, from: 'mohara88s@gmail.com' }
  try {
    await sgMail.send(email)
  } catch (error) {
    throw error
  }
}

module.exports = sendEmail
