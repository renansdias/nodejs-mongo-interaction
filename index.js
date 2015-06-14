var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connection = mongoose.createConnection('mongodb://localhost:27017/docker-test');
var peopleSchema = new Schema({
	_id: String,
	name: String,
	age: Number
});

var People = connection.model('Pessoa', peopleSchema);

connection.once('open', function() {
	app.get('/pessoas', function(req, res) {
	
		People
			.find({})
			.exec(function(err, docs) {
				if (err) throw err;

				res.json(docs);
			});
	});

	app.listen(5001, function() {
		console.log('App running on port 5001...');
	});
});