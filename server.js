//Load express module
var express = require('express');
var bodyParser = require('body-parser');
//create an express app
var app = express();
var port = 3000;

// Folder to serve static contents
app.use(express.static('public'));

// parse application/json
app.use(bodyParser.json());

// Register URLs
app.post('/invoices', function (req, res) {
	console.log('Hello again',req.body);

	res.send({"name":"swati"});
});


// Start the server
app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!');
});
