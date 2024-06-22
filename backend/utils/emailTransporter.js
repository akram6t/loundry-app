const nodemailer = require('nodemailer');


const emailTransporter = nodemailer.createTransport({
     service: 'gmail',
     host: "smtp.gmail.com",
     port: 587,
     //   secure: true, // Use `true` for port 465, `false` for all other ports
     auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_APP_PASSWORD,
     },
     //   tls: { rejectUnauthorized: false } // }
});


function forgotHtmlContent({ companyName, resetLink }) {
     return `
     <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; line-height: 1.5;">You are receiving this email because you (or someone else) requested to reset your password for your ${companyName} account.</p>

     <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; line-height: 1.5;">If you did not request this, please ignore this email.</p>
     
     <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; line-height: 1.5;">If you did request a password reset, click the following link to reset your password:</p>
     
     <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; font-family: Arial, sans-serif; font-size: 16px;">Reset Password</a>
     
     <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; line-height: 1.5;">This link will expire in 10 minutes.</p>
     
     <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; line-height: 1.5;">Thank you,<br>${companyName} Team</p>
 `
}

module.exports = { emailTransporter, forgotHtmlContent };