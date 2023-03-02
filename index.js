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
    service: "gmail",
    // host: "imap-mail.outlook.com",
    // port: 993,
    // secure: false,
    // secure: true,
    // port: 465,
    auth: {
      user: "rolandbrake92@gmail.com",
      pass: "jgvfnzajrxrnxhei",
    },
  });

  const mailOptions = {
    from: "rolandbrake92@gmail.com",
    to: "rolandbrake92@gmail.com",
    subject: "New contact form submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send(error.message);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
