const {body, validationResult} = require('express-validator');

const validator = [
    body("jid").isNumeric(),
    body("uid").isNumeric(),
    body("method").isIn([1,-1]),
    (req,res,next) => {
        const errors = validationResult(req)?.errors;
        if(errors?.length > 0) return res.status(422).json({success : false});
        next();
    }
];

module.exports = validator;