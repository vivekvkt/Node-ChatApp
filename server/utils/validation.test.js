const expect = require('expect');


const{isRealString} = require('./validation');

describe('isRealString', ()=>{


it('should reject non real string value',()=>{



	var res = isRealString(98);
	expect(res).toBe(false);
});


it('should  reject string with only space',()=>{

var res = isRealString('  ');

expect(res).toBe(false);


});


it('should  reject string no space character',()=>{

var res = isRealString('    vivek  ');

expect(res).toBe(true);


});

});