const path = require('path');
const express = require('express');

const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage}= require('./utils/message');
const publicPath = path.join(__dirname, '../public');

var app = express();


var server = http.createServer(app);

var io = socketIO(server);
const port = process.env.PORT || 2018;

app.use(express.static(publicPath));


io.on('connection', (socket)=>{

	console.log('new user connected');




	socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat App'));
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'new joiner'));

	
	// socket.emit('newMessage' ,{
 //        from: "Admin",
 //        text: "thanks for joining chat app",
 //        CreatedAt: new Date().getTime()



	// });

	// socket.emit('newMessage' ,{
 //        from: "Admin",
 //        text: "new user joining",
 //        CreatedAt:new Date().getTime()



	// });


	socket.on('createMessage', (message, callback)=>{

		console.log('createMessage', message);

		io.emit('newMessage',generateMessage(message.from, message.text));

		callback('this is from server');

   });


	socket.on('createLocationMessage',(coords)=>{

		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});


	socket.on('disconnect', ()=>{

    console.log("user was disconnected");

	});

	

 socket.on('createEmail', function(new_email){
 	console.log('createEmail', new_email);
 });

});


server.listen(2018, ()=>{


console.log('server running at port${port}');

});
