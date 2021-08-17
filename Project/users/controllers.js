const jwt = require("jsonwebtoken");

const UserService = require("./services");

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
    await UserService.findUserWithoutEmail(req.body);
    const user = await UserService.confirmPassword(req.body);
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
    return res.send({ success: false, message: err.message });
  }
};
