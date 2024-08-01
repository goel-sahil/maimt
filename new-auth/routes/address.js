const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/addreess.controller');

router.get('/', AddressController.getAddresses);
router.get('/:id/show', AddressController.showAddress);
router.get('/create', AddressController.showAddressCreateForm)
router.post('/', AddressController.createAddress);
router.get('/:id/edit', AddressController.editAddressForm);
router.put('/:id', AddressController.updateAddress)
router.get('/:id/delete', AddressController.deleteAddress);


module.exports = router;