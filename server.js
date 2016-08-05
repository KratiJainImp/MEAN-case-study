var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {

	var reqURL = request.url;
	var reqURLArray = reqURL.split("/");
	if(reqURL == '/'){
		filePath = 'index.html';
	}else{
		filePath = './'+reqURL;
	}

	fs.readFile(filePath, function(error, content) {
		if (error) {
			response.writeHead(500);
			response.end('Sorry, error occured with error-code: '+error.code+' ..\n');
			response.end(); 
		}
		else {
			response.writeHead(200);
			response.end(content, 'utf-8');
			
		}
	});

}).listen(8000);

console.log("Server running at http://127.0.0.1:8000/");