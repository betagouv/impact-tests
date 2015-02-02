var express = require('express');
var mongoose = require('mongoose');
var ludwigApi = require('ludwig-api');

// Setup mongoose
mongoose.connect(process.env.MONGODB_URL);

// Setup Express
var app = express();

// Mount Ludwig API
// var Situation = mongoose.model('Situation');


app.use(ludwigApi({

    mongoose: mongoose,

    simulate: function (acceptanceTest, done) {
        // Situation.findById(acceptanceTest.scenario.situationId).exec(function (err, situation) {
        //     if (err) return done(err);
        //     if (!situation) return done(new Error('Situation not found'));
        //     situation.simulate(done);
        // });
        done(null, {});
    },

    onCreate: function (acceptanceTest, done) {
        // var situationId = acceptanceTest.scenario.situationId;

        // Situation.findById(situationId).exec(function (err, situation) {
        //     if (err) return done(err);
        //     if (!situation) return done(new Error('Situation not found'));
        //     situation.set('status', 'test');
        //     situation.save(done);
        // });
        done();
    }

}));

// Setup api
// require('./config/api')(app);

module.exports = app;
