'use strict'
var express = require('express');
var app = express();
var ws = require('express-ws')(app);
var net = require('net');

var lib = require('./hub/lib')
var hub = require('./hub/scene');


// settings
var port = 8000
var basepath = 'pub'
var dynamic = true

const args = process.argv;
for (let i = 2; i < args.length; i++) {
    if (args[i] === 'static') dynamic = false
}

// static http
app.use(express.static(basepath));

if (dynamic) {
    app.get('*/topology', function(req, res) {
        let path = req.url.substr(0, req.url.lastIndexOf('topology'))
        let ls = lib.survey('', basepath + path)

        if (ls.length > 0) {
            console.log('topology for ' + basepath + path)
            console.log(ls)
        } else {
            console.log('No topology for ' + basepath + path)
        }
        res.json(ls)
    });

} else {
    console.log('serving only static topology!')
}

app.get('/stat', function(req, res) {
    res.json(hub.state());
});


app.listen(port);
console.log('[http-server] Listening @' + port + '...');

// websocket endpoint
app.ws('/channel', function(ws, req) {

  ws.clientId = Math.floor(Math.random() * 100)
  console.log('connected on channel #' + ws.clientId)

  ws.on('message', function(msg) {
    if (msg.length > 0) {
        console.log('[ws #' + ws.clientId + '] ' + msg)
        ws.send(msg + '!')
    } else {
        ws.send('')
    }
  });
});



// socket server
var log = function(who, what) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    console.log('[%s on %s]', who, what, args);
  };
};

var echo = function(socket) {
  socket.on('end', function() {
    console.log('[end]');
  });
  socket.on('data', function(data) {
    console.log('[data]', data);
    var res = hub.post(socket.remoteAddress + ':' + socket.remotePort, data)
    socket.write(res, 'utf-8')
  });
  socket.on('timeout', log('socket', 'timeout'));
  socket.on('drain', function() {
    console.log('[drain]');
  });
  socket.on('error', log('socket', 'error'));
  socket.on('close', log('socket', 'close'));
};

var server = net.createServer(echo);
server.listen(7777);

server.on('listening', function() {
  var ad = server.address();
  if (typeof ad === 'string') {
    console.log('[socket-server] Listening @%s...', ad);
  } else {
    console.log('[socket-server] Listening @%s:%s using %s...', ad.address, ad.port, ad.family);
  }
});

server.on('connection', function(socket) {
  server.getConnections(function(err, count) {
    console.log('%d open connections!', count);
  });
});

server.on('close', function() { console.log('[close]'); });

server.on('err', function(err) {
  console.log(err);
  server.close(function() { console.log("shutting down the server!"); });
});

