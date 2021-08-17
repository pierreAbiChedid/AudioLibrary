const User = require("./users-models");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.sendGridTransportAPIKey,
    },
  })
);
exports.signup = async (body) => {
  try {
    const user = new User({
      email: body.email,
      password: body.password,
      name: body.name,
      registrationDate: new Date(),
    });
    await user.save();
  } catch (err) {
    throw newError("Could not add User");
  }
};

exports.sendWelcomeMail = (body) => {
  return transporter.sendMail({
    to: body.email,
    from: process.env.transporterEmail,
    subject: "Signup succeeded!",
    html: `<p>Welcome ${body.name}</p>`,
  });
};

exports.sendResetPasswordMail = (body, token) => {
  return transporter.sendMail({
    to: body.email,
    from: process.env.transporterEmail,
    subject: "Reset your password",
    html: `<p>Please click on the following link to reset your password: <br>
              http://localhost:3000/checkMail/${token}
          </p>`,
  });
};

exports.checkMailToken = (req) => {
  token = req.params.token;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.tokencode);
    return true;
  } catch (err) {
    const error = new Error("Invalid Token.");
    error.statusCode = 401;
    throw error;
  }
};

exports.resetPassword = async (body) => {
  try {
    await User.updateOne(
      { email: body.email },
      { $set: { password: body.password } }
    );
  } catch (err) {
    throw new Error("Could not update password");
  }
};

exports.findUserWithEmail = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      throw Error("Email already taken.");
    }
  } catch (err) {
    throw err;
  }
};

exports.findEmail = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw Error("No user with this email found.");
    }
  } catch (err) {
    throw err;
  }
};

exports.confirmPassword = async (body) => {
  try {
    const user = await User.findOne({
      email: body.email,
      password: body.password,
    });
    if (!user) {
      await User.updateOne(
        { email: body.email },
        { $inc: { numOfAttempts: 1 } }
      );
      throw Error("Wrong password.");
    }
    return user;
  } catch (err) {
    throw err;
  }
};

exports.removeNumOfAttempts = async (body) => {
  try {
    await User.updateOne({ email: body.email }, { $set: { numOfAttempts: 0 } });
  } catch (err) {
    throw err;
  }
};

exports.checkNumAttempts = async (body) => {
  try {
    await User.updateOne({ email: body.email }, [
      { $set: { active: { $ne: ["$numOfAttempts", 5] } } },
    ]);
  } catch (err) {
    throw err;
  }
};

exports.blockUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email, active: false });
    if (user) {
      throw new Error(
        "Account has been blocked. Please contact the administrator to reactivate the account."
      );
    }
  } catch (err) {
    err.statuscode = 401;
    throw err;
  }
};
