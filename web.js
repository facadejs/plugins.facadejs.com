var request = require('request');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var mongoURI = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/plugins';

var repos;

MongoClient.connect(mongoURI, function(err, db) {

    repos = db.collection('repos');

});

var express = require('express');
var server = express();

server.get('/api/repos', function(req, res) {

    if (repos) {

        repos.find().sort({ updated: -1 }).toArray(function (err, docs) {

            res.send({ count: docs.length, repos: docs });

        });

    } else {

        res.send(500);

    }

});

server.get('/api/repo/:id', function(req, res) {

    if (repos) {

        repos.findOne({ _id: new ObjectID(req.params.id) }, function (err, docs) {

            res.send(docs);

        });

    } else {

        res.send(500);

    }

});

server.post('/api/repo/:id/update', function(req, res) {

    var oauth_params = '?client_id=' + process.env.GITHUB_CLIENT_ID +
        '&client_secret=' + process.env.GITHUB_CLIENT_SECRET;

    if (repos) {

        repos.findOne({ _id: new ObjectID(req.params.id) }, function (err, docs) {

            request.get({
                url: 'https://api.github.com/repos/' + docs.owner.name + '/' + docs.name + oauth_params, headers: {
                'User-Agent': 'plugins.facadejs.com'
            }, json: true }, function (e, r, body) {

                repos.update({ _id: new ObjectID(req.params.id) }, { $set: {
                    name: body.name,
                    description: body.description,
                    url: body.html_url,
                    updated: body.updated_at,
                    owner: {
                        name: body.owner.login,
                        url: body.owner.html_url
                    }
                }}, function () {

                    res.send(200);

                });

            });

        });

    } else {

        res.send(500);

    }

});

server.use(express.static(__dirname + '/static'));

server.listen(process.env.PORT || 5000);
