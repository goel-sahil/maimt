var express = require('express');
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require("express-session");
var usersRouter = require('./routes/users');
// require('./config/db.config');
var app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static('./public'))
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
    secret: "sahil",
    // saveUninitialized: true,
    // resave: true
}));

// 
// $2b$10$WPr0T.nqoH/ZVxlytaVGqu

app.get('/hash', function (req, res) {
    // bcrypt.genSalt(10, function (err, salt) {
    //     console.log("Salt", salt);
    //     bcrypt.hash("sahil", salt, function (err, hash) {
    //         res.send(hash);
    //     });
    // });

    bcrypt.compare("sahiL", "$2b$10$WPr0T.nqoH/ZVxlytaVGquBIuYh566qMgK5GGIB7MqPBxhnH833jS", function (err, result) {
        res.send(result);
    });
})

app.get('/cookies/set', (req, res) => {
    res.cookie('username', 'sahil', {
        expires: new Date("2024/12/12")
    });
    res.cookie('password', 'sahilpw');
    res.render('index', { user: { name: 'Sahil' } });
});

app.get('/cookies/get', (req, res) => {
    res.render('index', {
        title: req.cookies.password
    });
});

app.get('/session', (req, res) => {
    if (req.session.view) {
        // The next time when user visits, 
        // he is recognized by the cookie 
        // and variable gets updated.
        req.session.view++;
        res.send("You visited this page for "
            + req.session.view + " times");
    }
    else {
        // If user visits the site for
        // first time
        req.session.view = 1;
        res.send("You have visited this page"
            + " for first time ! Welcome....");
    }
})

app.get('/', (req, res) => {
    res.render('index', { user: { name: 'Sahil' } });
});

app.use('/users', usersRouter);

module.exports = app;
