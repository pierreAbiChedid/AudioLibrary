const bcrypt = require("bcryptjs");

const User = require("../models/user");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.postSignup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      res.status(500).send("Email already taken");
    } else {
      try {
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
          email: email,
          password: hashedPw,
          name: name,
        });
        await user.save();
        res.end();
        return transporter.sendMail({
          to: email,
          from: "sendmailstesteurisko@gmail.com",
          subject: "Signup succeeded!",
          html: `<p>Welcome ${name}</p>`,
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(500).send("No user with this email found.");
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(500).send("Wrong password.");
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "secretcode",
      { expiresIn: "1h" }
    );
    res.send({ token: token, userId: loadedUser._id.toString() });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
