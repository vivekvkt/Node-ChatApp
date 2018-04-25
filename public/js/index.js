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


  socket.on('newLocationMessage',function(message){

  var li = jQuery('<li></li>');
  var a = jQuery('<a target = "_blank">My current Location</a>');

  li.text(`${message.from},`)
  a.attr('href', message.url);

  li.append(a);
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

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage',{

      from:'User',
      text:messageTextbox.val()
      //text:jQuery('[name=message]').val()

    }, function(){

        messageTextbox.val('')
    	//jQuery('[name=message]').val('')

     });

   });


   var locationButton = jQuery('#send-location');
   locationButton.on('click', function(){

   if(!navigator.geolocation){
   	return console.log('geolocation is not supported by your browser');

   }

   locationButton.attr('disabled', 'disabled').text('sending location...');



   navigator.geolocation.getCurrentPosition(function(position){
   	locationButton.removeAttr('disabled').text('sending location...');

   socket.emit('createLocationMessage',{

   	latitude:position.coords.latitude,
   	longitude:position.coords.longitude
   });

   }, function(){
   	locationButton.removeAttr('disabled').text('sending location');
   	alert('unable to fetch get loacation');
   })

})


