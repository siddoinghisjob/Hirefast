const { validationResult, body } = require("express-validator");

const details = [
    body("name").escape().trim().isString(),
    body("jobDescription").escape().trim().isString(),
    body("location").escape().trim().isString(),
    body("requireMents").escape().trim().isLength({ min: 10 }).isString(),
    body("offers").escape().trim().isString(),
    body("addInfo")
        .optional({ nullable: true, checkFalsy: true })
        .escape()
        .trim()
        .isString(),
    body("conInfo")
        .optional({ nullable: true, checkFalsy: true })
        .escape()
        .trim()
        .isString(),
    body("jobType").isIn(["0", "1", "2"]),
  (req, res, next) => {
    const errors = validationResult(req)?.errors;

    if (errors?.length > 0) {
      return res.status(422).json({
        success: false,
        msg: "Please fill all the required fields.",
      });
    }
    next();
  },
];

module.exports = details;
