//initial setup for test
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
before((done) => {
    mongoose.connect('mongodb://localhost/users_test'); //users_test is a specified database in a Mongo installation
    //if users_test does not exists, mongoose and mongo will create it automatically each you want to save a record
    mongoose.connection
        .once('open', () => {
            done();
        })
        .on('error', (error) => {
            console.warn("warning: ", error);
        });
    // 'open', 'error' are some particalur events used in mongo    
});

//flush test db before each test
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done(); // a signal to mocha that can go ahead and start test
    });
});