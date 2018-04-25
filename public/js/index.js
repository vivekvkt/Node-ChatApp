var socket = io();

   socket.on('connect', function(){

     console.log('conneted to server');


    
   });

   socket.on('disconnect',function(){

   console.log('disconnect from server');
   });

   socket.on('newMessage', function(message){
   	console.log('newMessage',message);


    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);

 });

   socket.on('new_email', function(email){

      console.log('new eamil',email);
   });

   // socket.emit('createMessage',{

   //  from:'vivek',
   //  text:'hi'

   // },function(data){

   // 	console.log("Got it",data);
   // });

   jQuery('#message-form').on('submit', function(e){


    e.preventDefault();

    socket.emit('createMessage',{

      from:'User',
      text:jQuery('[name=message]').val()

    }, function(){

     

    });

   });