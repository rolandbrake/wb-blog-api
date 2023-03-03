const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// d2Fzc2ltYnJha2U=
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send", (req, res) => {
  const { name, email, message, subject } = req.body;
  console.log(req.body);

  const user = "rolandbrake92@gmail.com";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: "jgvfnzajrxrnxhei",
    },
  });

  const mailOptions = {
    from: user,
    to: user,
    subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send(info.response);
    }
  });
});

app.listen(process.env.PORT || 8081, () => {
  console.log("Server running on port:" + (process.env.PORT || 8081));
});
