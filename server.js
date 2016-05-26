var express = require('express');
var app = express();

var mongojs = require('mongojs');
// First contactlist is the database using
// Second contactlist is the collection using
var db = mongojs('contactlist', ['contactlist']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (request, response) {
    console.log('I received a GET request');

    db.contactlist.find(function (err, docs) {
        console.log(docs);
        response.json(docs);
    });
});

app.post('/contactlist', function (request, response) {
    console.log(request.body);
    var objectCreate = request.body;
    if ( objectCreate.hasOwnProperty('_id') ) {
        delete objectCreate['_id'];
    }
    
    db.contactlist.insert(request.body, function (err, docs) {
        response.json(docs);
    });
});

app.delete('/contactlist/:id', function (request, response) {
    var id = request.params.id;
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, docs) {
        response.json(docs);
    });
    console.log(id);
});

app.get('/contactlist/:id', function (request, response) {
    var id = request.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, docs) {
        console.log(err);
        console.log(docs);
        response.json(docs);
    })    
});

app.put('/contactlist/:id', function (request, response) {
    var id = request.params.id;
    console.log(request.body.name);
    db.contactlist.findAndModify({
        Query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: request.body.name, email: request.body.email, number: request.body.number}},
        new: true 
    }, function (err, docs) {
        response.json(docs);
    });
});

app.listen(3000);
console.log("Welcome, server is running on http://127.0.0.1:3000");