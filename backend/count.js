const { Sequelize, DataTypes } = require('sequelize');
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const express = require("express");

// Initialize Sequelize with MySQL connection
const sequelize = new Sequelize('emailcounter', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

// Define the email table schema
const Email = sequelize.define('email', {
   subject: { type: DataTypes.STRING, primaryKey: true },
  recipient: DataTypes.STRING,
  attachment: DataTypes.BOOLEAN,
  sentCount: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  timestamps: false // Disable timestamps columns createdAt and updatedAt
});

// Send Mail function using Nodemailer
async function sendMail() {
    // Define mailTransporter within the sendMail function
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "harshkariya5554@gmail.com",
            pass: "nrxf hjpn agkc hxme"
        }
    });

    let mailDetails = {
        from: "harshkariya5554@gmail.com",
        to: "harshraguvanshi999@gmail.com",
        subject: "hello",
        text: "This is a test email sent using Node.js cron job.",
        attachments: [{
            filename: 'text.txt',
            content: 'hello world!'
        }]
    };

    try {
        const existingEmail = await Email.findOne({ where: { subject: mailDetails.subject } });

        if (existingEmail) {
            await Email.update(
                { sentCount: existingEmail.sentCount + 1 },
                { where: { subject: mailDetails.subject } }
            );
        } else {
            await Email.create({
                subject: mailDetails.subject,
                recipient: mailDetails.to,
                attachment: true,
                sentCount: 1
            });
        }

        await mailTransporter.sendMail(mailDetails);
        console.log("Email sent successfully");
    } catch (err) {
        console.log("Error Occurs", err);
    }
}

// Start the server
const app = express();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// Calling sendEmail() function every 1 minute
cron.schedule("*/1 * * * *", function() {
    sendMail();
});
