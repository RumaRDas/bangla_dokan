exports.userSignupValidator = (req, res,next) =>{
    re.check('name', "Name is required").notEmpty()
    re.check('email', "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 4,
        max: 32
    });
    req.check('password', "Password i srequired").notEmpty()
    req.check('password')
    .islength({min:6})
    .withMessage("Password must contain at least 6 haracters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    const  errors = req.validationErrors()
    if(errors){
        const firstError = errors.map( error => error.message)[0];
        return res.status(400).json({error: firstError});
    }
    next();
};