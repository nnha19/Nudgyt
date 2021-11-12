const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const signupController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      res
        .status(400)
        .json(
          "User with the provided email already exists. Please login instead."
        );
    } else {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          const newUser = User.create({ username, email, password: hash });
          if (newUser) {
            const token = jwt.sign(
              { username, email },
              process.env.JWT_SECRET,
              {
                expiresIn: "1h",
              }
            );
            res.status(200).json({ username, email, token, _id: newUser._id });
          }
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong, please try again later.");
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      bcrypt.compare(password, foundUser.password).then((resp) => {
        if (resp) {
          const token = jwt.sign(
            { username: foundUser.username, email },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({
            username: foundUser.username,
            email,
            token,
            _id: foundUser._id,
          });
        } else {
          res.status(400).json("Incorrect password");
        }
      });
    } else {
      res.status(400).json("User with provided email doesn't exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong, please try again later.");
  }
};

const getUsersController = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

exports.signupController = signupController;
exports.loginController = loginController;
exports.getUsersController = getUsersController;
