const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const validateUserCreation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('addresses').isArray({ min: 1 }).withMessage('At least one address is required'),
    body('addresses.*.address').notEmpty().withMessage('Address is required'),
    body('addresses.*.city').notEmpty().withMessage('City is required'),
    body('addresses.*.state').notEmpty().withMessage('State is required'),
    validate,
];

const validateUserUpdation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().isEmail().withMessage('Invalid email format'),
    validate,
];

const validateAddressUpdation = [
    body('address').notEmpty().withMessage('Address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    validate,
];

module.exports = { validateUserCreation, validateUserUpdation, validateAddressUpdation };