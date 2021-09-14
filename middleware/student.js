// name and password verify middleware
const namePasswordVerify = (req, res, next) => {
  let username = "admin",
    password = "1234";
  let { name, pass } = req.query;

  if (username == name && password == pass) {
    next();
  } else {
    res.send("Your username and password is incorrect!!");
  }
};
// authCode verify middleware
const authCode = (req, res, next) => {
  let auth = "1212";
  let { authcode } = req.query;

  if (authc == authCode) {
    next();
  } else {
    res.send("Your username and password is incorrect!!");
  }
};

module.exports = {
  namePasswordVerify,
  authCode,
};
