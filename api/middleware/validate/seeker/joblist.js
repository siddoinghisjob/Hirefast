const {query, validationResult} = require('express-validator');

const validator = [
    query("size").trim().isNumeric(),
    query("search").trim().isString(),
    (req, res, next) => {
        const errors = validationResult(req)?.errors;
        if(errors?.length > 0) return res.json({success : false}).status(422);

        next();
    }
]

module.exports = validator;