const assert = require('assert');
const User = require('../src/users');

describe('validate new user', () => {
  it('user name should be required', () => {
    const joe = new User({name: undefined}) // same as new User({})
    const validationResult = joe.validateSync();
    const {message} =  validationResult.errors.name; //es6: const {message} = validationResult.errors.name;
    
    assert(message === "Name is required!");
    // done();
  });

  it('user name should longer than 2!', () => {
    const joe = new User({name: "AI"}) // same as new User({})
    const validationResult = joe.validateSync();
    const {message} =  validationResult.errors.name;
    console.log("console: " + message);
    assert(message === "Name should be longer than 2 characters");
   // done();
  });

  it('disallow saving user\'s name less then 2 characters', (done) => {
    const joe = new User({name: "AL"});
    joe.save()
      .catch((validationResult) => {
        const {message} = validationResult.errors.name;
        assert(message === "Name should be longer than 2 characters");
        done();
      })
  });
});