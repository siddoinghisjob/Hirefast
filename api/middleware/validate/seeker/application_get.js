const {body, validationResult} = require('express-validator');

const validator = [
    body("jid").trim().isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req)?.errors;
        if(errors?.length > 0) return res.json({success : false}).status(422);
        next();
    }
]

module.exports = validator;