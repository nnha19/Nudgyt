const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  //Check if the request sent from browser has jwt token
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(400).json("You are not authorized.");
  } else {
    //if token is attached, check if it's a valid token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
      } else {
        if (decoded) {
          const { username, email } = decoded;
          req.user = { username, email };
          next();
        }
      }
    });
  }
};

module.exports = authMiddleware;
