var MongoClient = require('mongodb').MongoClient;

var mongoURI = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/plugins';

var repos;

MongoClient.connect(mongoURI, function(err, db) {

    repos = db.collection('repos');

});

var express = require('express');
var server = express();

server.get('/api/repos', function(req, res) {

    if (repos) {

        repos.find({}, { sort: 'name' }).toArray(function (err, docs) {

            res.send({ count: docs.length, repos: docs });

        });

    } else {

        res.send(500);

    }

});

server.use(express.static(__dirname + '/static'));

server.listen(process.env.PORT || 5000);
