const { validationResult, body } = require("express-validator");

const middleware = [
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
  (req, res, next) => {
    const errors = validationResult(req)?.errors;
    const message = errors?.map((error) => error.msg);

    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        msg: message,
      });
    }
    next();
  },
];

module.exports = middleware;