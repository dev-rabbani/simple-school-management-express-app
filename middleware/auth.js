const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    const token = req.header("Autorization");
    if (!token) {
      return res.json({
        msg: "You are not authenticate user",
      });
    }
    const data = jwt.verify(token, secretKey);
    req.user = data;
    next();
  } catch (error) {
    return res.json({
      error,
    });
  }
};

module.exports = auth;
