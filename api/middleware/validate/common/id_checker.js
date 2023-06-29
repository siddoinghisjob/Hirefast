const { validationResult, query } = require("express-validator");

const details = [
    query("id").isInt().withMessage("Invalid Data."),
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

module.exports = details;
