const expect = require('expect');

const {Users} = require('./users');

describe ('Users', ()=>{


var users;

beforeEach(()=>{

  users = new Users();
  users.users=[
   {
    id:'1',
    name:'vivek',
    room:'reactroom'
   },
   {
    id:'2',
    name:'Akshay',
    room:'nodeRoom'
   },
   {
    id:'3',
    name:'surya',
    room:'mongoDb'
   }];


});

it('should add new user', ()=>{

  var users = new Users();
  var user={

  id:'123',
  name:'vivek',
  room:'The office room'

  };
  var resUser = users.addUser(user.id, user.name, user.room);

  expect(users.users).toEqual([user]);

});

it('should remove user',()=>{

var userId = '1';
var user= users.removeUser(userId);
expect(user.id).toBe(userId);

expect(users.users.length).toBe(2);

});


it('should not remove user', ()=>{

var userId = '99';
var user= users.removeUser(userId);
expect(user).toNotExist();

expect(users.users.length).toBe(3);


});


it('should find user',()=>{

 var userId = '2';

 var user = users.getUser(userId);
 expect(user.id).toBe(userId);

});


it('should not find user',()=>{

var userId = '99';
var user = users.getUser(userId);

expect(user).toNotExist();

});


it('should return node course',()=>{


	var userList = users.getUserList('Node Course');

	expect(userList).toEqual(['vivek', 'surya']);
});

it('should return React course',()=>{


	var userList = users.getUserList('React Course');

	expect(userList).toEqual(['vivek', 'surya']);
});

it('should return mongoDb course',()=>{


	var userList = users.getUserList('mongoDb Course');

	expect(userList).toEqual(['vivek', 'surya']);
});


});