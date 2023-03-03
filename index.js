const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
// d2Fzc2ltYnJha2U=
// JJCER-2G5C9-KA72Y-N8XLC-K9PWW
// wcjuwusjblurvwsu
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);

app.post("/send", (req, res) => {
  const { name, email, message, subject } = req.body;
  console.log(req.body);

  const user = "wassimbrake@hotmail.com";
  const transporter = nodemailer.createTransport({
    // service: "gmail",
    service: "hotmail",
    auth: {
      user: user,
      // pass: "jgvfnzajrxrnxhei",
      pass: "wcjuwusjblurvwsu",
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
