const jwt = require("jsonwebtoken");

const checkLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split("%20")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decoded;
    req.name = username;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = checkLogin;
