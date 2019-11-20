var http = require("http");
var fs = require("fs");

function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404 - Page not found");
    response.end();
}

function onRequest(request, response) {

    if( request.method == 'GET' && request.url.startsWith('/') && fs.existsSync(request.url.slice(1))){
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.createReadStream("."+request.url).pipe(response);
    }else{
        send404Response(response);
    }

}
let server = http.createServer(onRequest)
server.listen(8000)
console.log("Server is up...")
setTimeout(() => {
    server.close();
    console.log("Server is down...")
},10000)
