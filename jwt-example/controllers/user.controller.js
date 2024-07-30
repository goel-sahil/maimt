const { query } = require("express");
const db = require("../config/db");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class User {
    static async login(req, res) {
        let { email, password } = req.body;
        db.query('select * from users where email=?', [email], async (err, result) => {
            if (err) {
                res.json({ message: "error in fetching user" });
            }
            if (result.length != 0) {
                let user = result[0];
                let passwordIsSame = await bcrypt.compare(password, user.password);
                if (passwordIsSame) {
                    var token = jwt.sign(user, 'shhhhh', { expiresIn: '1h' });
                    res.json({ message: "Login successfully", token: token });
                }
                else {
                    res.json({ message: "Incorrect password!" });
                }
            }
            else {
                res.json({ message: "User is not registered!" });
            }
        })
    }
    static async registration(req, res) {
        let { name, email, password } = req.body;
        password = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users(name,email,password,role,status) values('${name}','${email}','${password}','user','1')`;
        db.query(query, (err, result) => {
            if (err) {
                res.json({
                    message: err
                })
            } else {
                res.json({ message: "registered successfully" });
            }
        });
    }


    static async getProfile(req, res) {
        res.json({ message: "Profile details fetched successfully", result: req.user });
    }
}

module.exports = User