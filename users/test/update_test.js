const assert = require('assert');
const User = require('../src/users');

describe('updating user...', () => {
  let jane;

  beforeEach((done) => {
    jane = new User({name: 'jane'});
    jane.save()
      .then(() => done());
  });

  it('instance type update by using set and save method', (done) => {
    jane.set('name', 'janey'); // just change in memory, not change in db yet
    jane.save()
      .then(() => User.find({})) //find all records in collection
      .then((users) => {      
        assert(users.length === 1);
        assert(users[0].name === 'janey');
        done();
      });
      //console.log(jane);
  });

  //instance update
  it('An instance is updated by using update method', (done) => {
    jane.update({name: 'janeeee'})
      .then(() => User.find({})) //find all records in collection
      .then((users) => {
        console.log("local: " + jane._id + "-" + jane.name); //jane ở local chưa được update theo tên mới nên khác với jane ở server
        console.log("server: " + users[0]._id + "-" + users[0].name);
        assert(users.length === 1);
        assert(users[0].name === "janeeee");
        done();
      });
  });
});