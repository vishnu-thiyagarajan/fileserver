let http = require("http");
let fs = require("fs");

function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404 - Page not found");
    response.end();
}

function onRequest(request, response) {
    if (request.url=="/" || request.url=="" ) request.url="/make"
    let foldsInDirectory, filesHtml = ""
    let file = /^\/.*\/(.*\..*)$/g.exec(request.url)
    if( file && request.method == 'GET' && fs.existsSync(request.url.slice(1))){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("content of the file is : <br>")
        fs.createReadStream("."+request.url).pipe(response);
    }else{
    if (!file && request.method == 'GET') {
        foldsInDirectory = fs.readdirSync(request.url.slice(1))
        for (let folderName of foldsInDirectory){
            filesHtml += "<li> <a href='http://localhost:8000"+request.url+"/"+folderName+"'>"+ folderName + "</a></li>"
        }
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("files in the directory : <br>" + filesHtml)
        response.end()
    }else{
        send404Response(response);
    }
    }
}
let server = http.createServer(onRequest)
server.listen(8000)
console.log("Server is up...")
setTimeout(() => {
    server.close();
    console.log("Server is down...")
},900000)
