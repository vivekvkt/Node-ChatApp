var socket = io();

   socket.on('connect', function(){

     console.log('conneted to server');


    
   });

   socket.on('disconnect',function(){

   console.log('disconnect from server');
   });

   socket.on('newMessage', function(message){
   	console.log('newMessage', message);
   });

   socket.on('new_email', function(email){

      console.log('new eamil',email);
   });