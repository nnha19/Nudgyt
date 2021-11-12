const route = require("express").Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

route.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("username").not().isEmpty(),
  userController.signupController
);
route.post("/login", userController.loginController);
route.get("/", authMiddleware, userController.getUsersController);

module.exports = route;
