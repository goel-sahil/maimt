const UserAddress = require('../models/user_addresses');

class AddressController {
    static async getAddresses(req, res) {
        const addresses = await UserAddress.findAll({
            where: {
                user_id: req.user.id,
            }
        });
        return res.render('address/list', { addresses: addresses });
    }

    static async showAddressCreateForm(req, res) {
        return res.render('address/create');
    }

    static async createAddress(req, res) {
    }

    static async showAddress(req, res) {
        return res.render('address/show');
    }

    static async editAddressForm(req, res) {
        return res.render('address/edit');
    }

    static async updateAddress(req, res) {
    }

    static async deleteAddress(req, res) {
    }
}

module.exports = AddressController;