
const nodemailer = require("nodemailer");
const cron = require("node-cron")
const express = require("express");
const app = express();
// Calling sendEmail() function every 1 minute
cron.schedule("*/1 * * * *", function() {
    sendMail();
});

// Send Mail function using Nodemailer
function sendMail() {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "harshkariya5554@gmail.com", // Replace with your Gmail address
            pass: "nrxf hjpn agkc hxme" // Replace with your Gmail password or App Password
        }
    });

    // Setting email details
    let mailDetails = {
        from: "harshkariya5554@gmail.com",
        to: "hkariya.netclues@gamail.com",
        subject: "Test mail using Cron job",
        text: "This is a test email sent using Node.js cron job."
    };

    // Sending email
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            console.log("Email sent successfully");
        }
    });
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
