const { fstat } = require('fs');
const http =  require('http');
const port = 3000;
const fs = require ('fs');
const { routes } = require('./route.');


// Create Server
http.createServer((req,res)=>{
	
	res.writeHead(200,{
		"Content-type" : "text/html" 
	});

	const url = req.url;
		// Untuk menampilkan page dengan path (/about)
	if (url ==="/about"){
		routes("./views/about.html", res);
	}
	// Untuk menampilkan page dengan path (/contact)
	else if (url ==="/contact"){
		routes("./views/contact.html", res);
	}
	// Untuk menampilkan page dengan path (/)
	else if (url ==="/"){
		routes("./views/index.html", res);
	}
	else {
		res.writeHead(404);
		res.write(" Page Not Found");
		res.end();
	}
})
// Server Port
.listen (3000,()=>{
	console.log("Server has running on port 3000");
});