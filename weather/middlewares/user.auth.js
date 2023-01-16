const jwt = require("jsonwebtoken");

require("dotenv").config();

const userAuth = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        res.status(401).send({ msg: "Plz Login again", err: err.message });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ msg: "Plz Login again" });
  }
};

module.exports = { userAuth };
