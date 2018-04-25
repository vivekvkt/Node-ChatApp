var expect  = require('expect');
var {generateMessage} = require('./message');


describe('generateMessage',()=>{


it( 'should be generate correct message object',()=>{

	var from  = 'vk';
	var text = 'some message';
	var message = generateMessage(from , text);

	expect(message.createdAt).toBeA('number');
	expect(message).toInclude({from, text});


// store res in varriable
//assert from match
//assert text match
// assert createdAt time




});

});