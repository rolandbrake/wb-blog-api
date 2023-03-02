const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(req);

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    // host: "imap-mail.outlook.com",
    // port: 993,
    // secure: false,
    auth: {
      user: "wassimbrake@hotmail.com",
      pass: "d2Fzc2ltYnJha2U=",
    },
  });

  const mailOptions = {
    from: "wassimbrake@hotmail.com",
    to: "wassimbrake@hotmail.com",
    subject: "New contact form submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
