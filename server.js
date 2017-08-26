//Load express module
var express = require('express');
//create an express app
var app = express();
var port = 3000;

// Folder to serve static contents
app.use(express.static('public'));

// Register URLs
app.get('/hello', function (req, res) {
	console.log('Hello again');
	res.send('Hello World!');
});


// Start the server
app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!');
});
