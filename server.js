var express = require('express');
var app = express();

var mongojs = require('mongojs');
// First contactlist is the database using
// Second contactlist is the collection using
var db = mongojs('contactlist', ['contactlist']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function(request, response) {
   console.log('I received a GET request') ;

    db.contactlist.find(function(err, docs) {
       console.log(docs);
       response.json(docs);
    });
});

app.post('/contactlist', function(request, response) {
   console.log(request.body); 
   db.contactlist.insert(request.body, function(err,docs){
       response.json(docs);
   });
});

app.listen(3000);
console.log("Welcome, server is running on port 3000");