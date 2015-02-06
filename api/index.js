'use strict';

var express = require('express');
var mongoose = require('mongoose');
var ludwigApi = require('ludwig-api');
var Simulation = require('./simulation');
var _ = require('lodash');

// Setup mongoose
mongoose.connect(process.env.MONGODB_URL);

// Setup Express
var app = express();

// Mount Ludwig API
// var Situation = mongoose.model('Situation');

var possibleValues = [
    {
        id: 'carteStationnement',
        shortLabel: 'Carte stationnement',
        title: 'Carte de stationnement',
        hasMontant: false
    },
    {
        id: 'carteInvalidite',
        shortLabel: 'Carte d\'invalidité',
        title: 'Carte d\'invalidité',
        hasMontant: false
    },
    {
        id: 'aeeh',
        shortLabel: 'AEEH',
        title: 'Allocation d\'éducation de l\'enfant handicapé',
        hasMontant: false
    },
    {
        id: 'aah',
        shortLabel: 'AAH',
        title: 'Allocation aux adultes handicapés',
        hasMontant: false
    },
    {
        id: 'pch',
        shortLabel: 'PCH',
        title: 'Prestation de compensation du handicap',
        hasMontant: false
    },
    {
        id: 'rqth',
        shortLabel: 'RQTH',
        title: 'Reconnaissance de la Qualité de Travailleur Handicapé',
        hasMontant: false
    },
    {
        id: 'av',
        shortLabel: 'AV',
        title: 'Affiliation gratuite à l\'assurance vieillesse',
        hasMontant: false
    },
    {
        id: 'ems',
        shortLabel: 'EMS',
        title: 'Accompagnement par un service ou établissement médico-social',
        hasMontant: false
    },
    {
        id: 'pps',
        shortLabel: 'PPS',
        title: 'Plan personnalisé de scolarisation',
        hasMontant: false
    },
    {
        id: 'orp',
        shortLabel: 'ORP',
        title: 'Orientation professionnelle',
        hasMontant: false
    },
    {
        id: 'ac',
        type: 'presta-finances',
        title: 'Allocation compensatrice',
        hasMontant: false
    }
];

app.use(ludwigApi({

    mongoose: mongoose,

    possibleValues: possibleValues,

    simulate: function (acceptanceTest, done) {
        var result = Simulation.compute(acceptanceTest.scenario, possibleValues);

        var droitsObtenus = {};
        _.forEach(result, function(droit) {
            droitsObtenus[droit.id] = true;
        });

        done(null, droitsObtenus);
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
