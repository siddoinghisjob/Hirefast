const { validationResult, check } = require("express-validator");

const validators = require('../common/validators');
const emailvalidator = require("../common/emailvalidator").owner;

const register = [
  ...validators,
  check("email")
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(emailvalidator),
  (req, res, next) => {
    const errors = validationResult(req)?.errors;
    const message = errors?.map((error) => error.msg);

    if (errors?.length > 0) {
      return res.status(422).json({
        success: false,
        msg: message,
      });
    }
    next();
  },
];

module.exports = register;
