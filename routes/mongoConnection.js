var mongoose = require('mongoose');

var url = 'mongodb://localhost/bloze';

var options = {
  //db: { native_parser: true },
  server: { poolSize: 100 }
 // replset: { rs_name: 'myReplicaSetName' },
  //user: 'myUserName',
  //pass: 'myPassword'
}

// var url = 'mongodb://192.168.8.244:25051/db';

// var options = {
//   //db: { native_parser: true },
//   server: { poolSize: 100 },
//   //replset: { rs_name: 'myReplicaSetName' },
//   user: 'f3fe41bd-5cf1-43e0-b0bc-3552d921e109',
//   pass: '21d41e10-bc4b-4d0d-8923-f800439af2f5'
// }

var mongooseConnection = mongoose.connect(url, options);

module.exports = mongooseConnection;
