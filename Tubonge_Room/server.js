var http = require('http');
var url = require('url');
var fs = require('fs');

// create server 
var server = http.createServer(function(req, res){
    var parsedUrl = url.parse(req.url,true);
    switch (parsedUrl.pathname) {
        case '/':
        fs.readFile('index.html', function(err, content){
            if(err) {
                res.writeHead(500);
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html'});
                res.end(content, 'utf-8');
            }
        });
        break;
    }
});

// connect the websocket handler to our server
var websocket = require('socket.io')(server);

// handler creation for incoming websocket connections
websocket.on('UserConnectedEvent', function(socket){
    console.log('New user connected');

    // inform other users of  new user connected
    socket.broadcast.emit('UserConnectedEvent', null);

    // Bind event handler for incoming messages
    socket.on('MessageSentEvent', function(chatData){
        console.log(`Received new chat message`);
        socket.broadcast.emit(`MessageReceivedEvent`, chatData);
    });
});

server.listen(8000);