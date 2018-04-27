const path = require('path');
const express = require('express');

//const moment = require('moment');

const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage}= require('./utils/message');
const publicPath = path.join(__dirname, '../public');

const{isRealString} = require('./utils/validation');


const{Users} = require('./utils/users');

var app = express();


var server = http.createServer(app);

var io = socketIO(server);

var users = new Users();
const port = process.env.PORT || 2019;

app.use(express.static(publicPath));


io.on('connection', (socket)=>{

	console.log('new user connected :' , socket.id);




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

	return callback('name and room name are require');
}


    socket.join(params.room);
    
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name,params.room);
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    //console.log("room name",params.room)

    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat App'));
	socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

     callback();


});

	socket.on('createMessage', (message, callback)=>{

		//console.log('createMessage', message);

		var user = users.getUser(socket.id);

		if(user && isRealString(message.text)){

		io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
	}

		//callback('this is from server');
		callback();

   });


	socket.on('createLocationMessage',(coords)=>{


		var user = users.getUser(socket.id);
		if(user){

			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}

		//io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});


	socket.on('disconnect', ()=>{

    //console.log("user was disconnected");

    var user = users.removeUser(socket.id);

    if(user){


    	io.to(user.room).emit('updateUserList',users.getUserList(user.room));

    	io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left `));
    }

	});

	

 socket.on('createEmail', function(new_email){
 	console.log('createEmail', new_email);
 });

});


server.listen(2019, ()=>{


console.log(`server running at port ${port}`);

});
