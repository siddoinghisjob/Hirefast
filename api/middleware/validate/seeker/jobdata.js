const { validationResult, query } = require("express-validator");

const del = [
  query("id").isInt().withMessage("Invalid data."),
  (req, res, next) => {
    const errors = validationResult(req)?.errors;
    const message = errors?.map((error) => error.msg);

    if (errors?.length > 0) {
      return res.status(422).json({
        success: false
      });
    }
    next();
  },
];

module.exports = del;
