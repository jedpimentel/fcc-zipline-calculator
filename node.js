var test = "I'm a little teacup short and stout";
// behold my jury rigged code, I'm not yet comfortable 
// with Node.js, I'm mostly doing this so I can test code
// on a local server instead of codepen or opening via 
// my browser. (first time I try to host more than a single file)
// I'm 100% sure there are beter ways to do this


var html, style, script;
var files = {}
var fs = require("fs");
fs.readFile("main.html", "utf8", function(error, text) {
	if (error)
		throw error;
	//console.log("The file contained:", text);
	files['/main.html'] = {
		'content': text,
		'type': "text/html",
	};
});
fs.readFile("style.css", "utf8", function(error, text) {
	if (error)
		throw error;
	//console.log("The file contained:", text);
	files['/style.css'] = {
		'content': text,
		'type': "text/css",
	};
});
fs.readFile("script.js", "utf8", function(error, text) {
	if (error)
		throw error;
	//console.log("The file contained:", text);
	files['/script.js'] = {
		'content': text,
		'type': "text/javascript",
	};
	//console.log(files['/script.js']);
});

//To do: learn how to load image files in Node.js

console.log(files);

var http = require("http");
var server = http.createServer(function(request, response) {
	console.log(request.url);
	if (request.url === '/') { request.url = '/main.html'; }
	if (files.hasOwnProperty(request.url)) {
		response.writeHead(200, {"Content-Type": files[request.url].type});
		
		
		var responseText = files[request.url].content;
		//console.log(responseText);
		response.write(responseText);
	} else {
		;
	}
	response.end();
});
console.log("starting server...");
server.listen(8000);
