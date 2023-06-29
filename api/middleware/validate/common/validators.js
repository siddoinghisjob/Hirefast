const {body, check} = require('express-validator');
const imagevalidator = require("../common/imagevalidator");

const validators = [
    body("name")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Name must be atleast 1 letter."),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 letters."),
  body("desc")
    .isString()
    .isLength({ min: 50 })
    .trim()
    .escape()
    .withMessage("Description should be minimum 50 letters."),
  body("desc")
    .isString()
    .isLength({ max: 300 })
    .trim()
    .escape()
    .withMessage("Description must be atmax 300 letters."),
  body("terms")
    .equals("true")
    .withMessage("Please select our terms and condition."),
  body("country")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Please select your country."),
  check("profile").custom(imagevalidator),
]

module.exports = validators;