const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const auth = (role) => {
  return (req, res, next) => {
    jwt.verify(req.cookies.token, process.env.secret, (err, suc) => {
      if (err)
        return res
          .status(401)
          .json({ success: false, msg: "Invalid credentials" });
      if (suc && ((parseInt(suc.type) === parseInt(role)) || (parseInt(role) === 2))) {
        req.jwtid = suc.key;
        req.jwttype = suc.type;
        next();
      } else
        return res
          .status(402)
          .json({ success: false, msg: "Invalid credentials" });
    });
  };
};

module.exports = auth;
