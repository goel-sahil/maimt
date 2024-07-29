class UserController {
    /**
     * Fetch the profile
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async getProfile(req, res) {
        return res.json({
            message: 'Profile details fetched successfully!',
            data: req.user,
        });
    }

}

module.exports = UserController