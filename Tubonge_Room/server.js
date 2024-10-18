var http = require('http');
const fs = require('fs');
var path = require('path');
const mime = require('mime-types');
var chatServer = require('./lib/chat_server');
var cache = {};

// sending file data and error Response

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found');
    response.end();
}

// sendfiles over the server
function sendFile(response, filePath, fileContents) {
    response.writeHead(
        200,
        {"content-type": mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
    if(cache[absPath]){
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists){
            if(exists) {
                fs.readFile(absPath, function(err, data){
                    if(err){
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        })
    }
}

var server = http.createServer(function(request, response){
    var filePath = false;

    if(request.url == '/'){
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + request.url;
    }
    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});

server.listen(3955, function(){
    console.log(`Server listen on port 3955`)
});

// setting up Socket.io server
chatServer.listen(server);