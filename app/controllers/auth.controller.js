const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signin = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    const user = await User.findOne({ username: username });
    //console.log("currentUser", user);

    if (!user) {
      return res.status(400).json({
        message: "You are not allowed to access the system. Please contact administrator",
      });
    }
    else {
      if (user.password === password)
        return res.status(201).json({
          message: "Login was successful",
          user: {
            fullname: user?.fullname,
            username: user?.username,
            token: jwt.sign({ username: user?.username, role: user?.role }, config.secret, {
              expiresIn: "1d",
            }),
          },
        });
      return res.status(403).json({
        message: "Login was failed, username or password not same with our system!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

exports.guest = async (req, res) => {
  try {
    return res.json(<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
    </svg>)
  } catch (err) {
    this.next(err);
  }
};

