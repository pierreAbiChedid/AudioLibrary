const jwt = require("jsonwebtoken");

const UserService = require("./users-services");

exports.signup = async (req, res, next) => {
  try {
    await UserService.findUserWithEmail(req.body);
    await UserService.signup(req.body);
    res.end();
    UserService.sendWelcomeMail(req.body);
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    await UserService.findEmail(req.body);
    await UserService.checkNumAttempts(req.body);
    await UserService.blockUser(req.body);
    const user = await UserService.confirmPassword(req.body);
    await UserService.removeNumOfAttempts(req.body);
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.tokencode,
      { expiresIn: "1h" }
    );
    res.send({ token: token, userId: user._id.toString() });
  } catch (err) {
    return res.send({
      status: err.statuscode,
      success: false,
      message: err.message,
    });
  }
};

exports.sendResetPasswordMail = async (req, res, next) => {
  try {
    const token = jwt.sign(
      {
        email: req.body.email,
      },
      process.env.tokencode,
      { expiresIn: "1h" }
    );
    UserService.sendResetPasswordMail(req.body, token);
    res.end();
  } catch (err) {
    res.status(500).send({ status: 500, success: false, message: err.message });
  }
};

exports.checkMailToken = async (req, res, next) => {
  try {
    const check = UserService.checkMailToken(req);
    if (check) {
      res.status(200).send({ status: 200, message: "success" });
    }
  } catch (err) {
    res.status(401).send({ status: 401, success: false, message: err.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    UserService.resetPassword(req.body);
    res.end();
  } catch (err) {
    res.status(500).send({ status: 500, success: false, message: err.message });
  }
};
