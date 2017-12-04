const assert = require('assert');
const User = require('../src/users');

describe('Creating Records', () => {
  it('saves an user', () => {
    const Joe = new User({name: "Joe"});
    Joe.save(); //save to db
  });
});