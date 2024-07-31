const { name } = require('ejs');
var express = require('express');
var router = express.Router();
const db = require('../connection')
const bcrypt = require("bcrypt")

router.post("/", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  const hashPassword = await bcrypt.hash(data.password, 10);
  let query = `INSERT into users (name,email,job_title,password) values(?,?,?,?)`;
  db.query(query, [data.name, data.email, data.job_title, hashPassword], (err, data) => {
    if (err) {
      console.log(err);
    }
    req.flash('info', 'You have registered successfully!')
    return res.redirect('/');
  })
});

module.exports = router;
