import * as nodemailer from "nodemailer"

const dotenv = require('dotenv')
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "janarboke@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });

export const sendMail = async(mailOptions, callback) => {
    try{
        const details = await transporter.sendMail(mailOptions);
        callback(details);
    } catch(error){
        console.log(error);
    }
};
