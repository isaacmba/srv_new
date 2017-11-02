var express = require('express'),
	mongoose = require('mongoose');
	// User = require('/User');

var app = express();

// mongoose.connect('mongodb://localhost/SRV/users');

app.use(express.static('public'));
app.use(express.static('node_modules'));

var database = {};

// routes
app.get('/', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html');
});
app.get('/livestream', function(req,res){
	res.sendFile('/public/livestream.html',{ root: __dirname });
})
app.get('/database', function(req,res){
	res.json(database);
})


app.get('/table', function(req,res){
	res.sendFile('/public/table');
})

app.listen(9000);
console.log('listening on port 9000');