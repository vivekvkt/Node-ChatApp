var socket = io();



  function scrollToButtom(){

    // selector
     var messages = jQuery('#messages');
     var newMessage = messages.children('li:last-child');

    //height
    var clientHeight = messages.prop('clientHeight');

    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');

    var newMessageHeight  = messages.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >=scrollHeight)
    {

      //console.log("should scroll");

      messages.scrollTop(scrollHeight);
    }

  }

   socket.on('connect', function(){

     console.log('conneted to server');


    
   });

   socket.on('disconnect',function(){

   console.log('disconnect from server');
   });



   socket.on('newMessage', function(message){

   //var formattedTime = moment(message.createdAt).formate('h:mm a');
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template,{

   text: message.text,
   from: message.from
   

   });

   jQuery('#messages').append(html);

   scrollToButtom();

   	// console.log('newMessage',message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from}: ${message.text}`);
    // jQuery('#messages').append(li);

 });


  socket.on('newLocationMessage',function(message){

   var template = jQuery('#location-message-template').html();

   var html = Mustache.render(template,{
    
   
   from:message.from,
    url:message.url 
   

   });


    jQuery('#messages').append(html);

   scrollToButtom();
   
   // socket.emit('createMessage',{

   //  from:'vivek',
   //  text:'hi'

   // },function(data){

   // 	console.log("Got it",data);
   // });
 });

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


