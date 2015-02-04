var express = require('express');
var errorHandler = require('errorhandler');
var morgan = require('morgan');

var env = process.env.NODE_ENV || 'development';

// Setup Express
var app = express();

if ('development' === env) {
    app.use(morgan('dev'));
}

if ('production' === env) {
    app.use(morgan());
}

// Setup app
app.use('/api', require('./impact-tests-api'));
require('ludwig-ui')(app);

if ('development' === env) {
    app.use(errorHandler());
}

// Start server
app.listen(process.env.PORT, function () {
    console.log('Express server listening on %d, in %s mode', process.env.PORT, env);
});

exports = module.exports = app;
