const path = require('path');
const express = require('express');

//const moment = require('moment');

const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage}= require('./utils/message');
const publicPath = path.join(__dirname, '../public');

const{isRealString} = require('./utils/validation');

var app = express();


var server = http.createServer(app);

var io = socketIO(server);
const port = process.env.PORT || 2019;

app.use(express.static(publicPath));


io.on('connection', (socket)=>{

	console.log('new user connected');




	// socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat App'));
	// socket.broadcast.emit('newMessage', generateMessage('Admin', 'new joiner'));

	
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



socket.on('join', (params, callback)=>{


if(!isRealString(params.name) || !isRealString(params.room)){

	callback('name and room name are require');
}


    socket.join(params.room);

console.log("room name",params.room)

    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat App'));
	socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

     callback();


});

	socket.on('createMessage', (message, callback)=>{

		console.log('createMessage', message);

		io.emit('newMessage',generateMessage(message.from, message.text));

		//callback('this is from server');
		callback();

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


server.listen(2019, ()=>{


console.log(`server running at port ${port}`);

});
