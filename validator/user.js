// external imports
const Joi = require("joi");

// userRegisterValidator
const userRegisterValidator = Joi.object({
  firstName: Joi.string().min(3).max(16),
  lastName: Joi.string().min(3).max(16),
  userName: Joi.string().min(6).max(12).required().alphanum(),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .regex(/^[a-zA-Z0-9]{4,12}$/),
  userRole: Joi.string(),
  activeStatus: Joi.string(),
});

// exports
module.exports = {
  userRegisterValidator,
};
