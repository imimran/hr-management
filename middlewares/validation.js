const {check,  validationResult} = require('express-validator');


//checking for validation errors 
const validate = (req, res, next) => {

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        console.log("valdation error: ", errors.array());
        // console.log("image: ", req.file);
       
        
        return res.status(200).json({errors: errors.array()});
}

//validating  data...
const employeeRegister = (req, res) => {
    return [
        check('first_name').isLength({min: 3, max: 20}).trim().escape().withMessage('FirstName should be atleast 3-20 characters.'),
        check('last_name').isLength({min: 3, max: 20}).trim().escape().withMessage('LastName should be atleast 3-20 characters.'),
        check('email').isEmail().normalizeEmail({gmail_remove_dots: false}).withMessage('Please enter a valid E-mail.'),
       
    ]; 
}

export default {
    validate,
    employeeRegister
}