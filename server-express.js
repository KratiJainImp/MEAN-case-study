var express = require("express");
	
var app =express();

app.use(express.static( __dirname ));
var server = app.listen(8000);
console.log("connected to server at port 8000");