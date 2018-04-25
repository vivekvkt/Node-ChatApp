const path = require('path');
const express = require('express');

const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

var app = express();


var server = http.createServer(app);

var io = socketIO(server);
const port = process.env.PORT || 2018;

app.use(express.static(publicPath));


io.on('connection', (socket)=>{

	console.log('new user connected');

	socket.on('disconnect', ()=>{

    console.log("user was disconnected");

	});
});


server.listen(2018, ()=>{


console.log('server running at port${port}');

});
