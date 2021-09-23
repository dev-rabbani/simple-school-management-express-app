const jwt_decode = require("jwt-decode");

const roleBasePermit = (userType) => {
  return (req, res, next) => {
    try {
      const token = req.header("Autorization");
      if (!token) {
        return res.json({
          msg: "Your are not autenticate user",
        });
      }
      const { userRole } = jwt_decode(token);
      const isInclude = userType.includes(userRole);
      if (isInclude) {
        next();
      } else {
        return next(
          res.json({
            msg: "You are not authenticate user",
          })
        );
      }
    } catch (error) {
      return res.json({
        error,
      });
    }
  };
};


module.exports = roleBasePermit;