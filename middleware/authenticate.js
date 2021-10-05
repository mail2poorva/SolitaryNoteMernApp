const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

require("dotenv").config();
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log(token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    console.log(rootUser);

    req.token = token;
    req.rootUser = rootUser;

    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorised: No token provided");
    console.log(err);
  }
};

module.exports = authenticate;
