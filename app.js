if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sessions = require('express-session');
var db = require('./connection');
const hbs = require('express-handlebars');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));


db.connect((err) => {
    if (err) console.log("Connection Error" + err);
    else console.log("Database connected to port")
})


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth-routes');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/', partialsDir: __dirname + '/views/partials/' }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use('/', indexRouter);
app.use('/auths', authRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
