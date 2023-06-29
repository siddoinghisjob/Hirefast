const { body, validationResult, check } = require("express-validator");


const login = [
    body("password").isLength({min:6}).withMessage("Invalid password"),
    check("email")
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email"),
    (req, res, next) => {
        const errors = validationResult(req)?.errors;
        const message = errors?.map((error) => error.msg);
    
        if (errors?.length > 0)
          return res.status(422).json({
            success: false,
            msg: message,
          });
        next();
      },
]

module.exports = login;