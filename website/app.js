var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect-mongo');
var flash = require('connect-flash');
var settings = require('./settings');
var session = require('express-session');
var exphbs = require('express3-handlebars')
var MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    defaulttDir: 'views',
    helpers: {
        section: function(name, options) {
            if (!this._sections) {
                this._sections = {};
            }
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));
app.set("view engine", 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, 'download')));
app.use(express.static(path.join(__dirname, 'desc')));

app.use(flash());
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db, //cookiename
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, //30days
    resave: false,
    store: new MongoStore({
        // db: settings.db
        url: 'mongodb://localhost/' + settings.db
    }, function() {
        console.log('connect mongodb success...');
    })
}));

var index = require('./routes/index');
var link = require('./routes/link');
var list = require('./routes/list');
var list_dl = require('./routes/dl');
var download = require('./routes/download');
var download_app = require('./routes/download_app');

app.use('/', index);
app.use('/link', link);
app.use('/list', list);
app.use('/dl', list_dl);
app.use('/download', download);
app.use('/download_app', download_app);
// app.use('/users', users);
// app.use('/*', list)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    // console.log('err')
});

app.listen(3000);
console.log('listening on 3000');
module.exports = app;