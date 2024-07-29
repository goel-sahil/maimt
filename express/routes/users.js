var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller.js');
const validator = require('../validators/user.validator.js');

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', validator.validateUserCreation, UserController.createUser);
router.put('/:id', validator.validateUserUpdation, UserController.updateUser);
router.put('/:user_id/address/:id', validator.validateAddressUpdation, UserController.updateUserAddress);
router.delete('/:id', UserController.deleteUser);

module.exports = router;