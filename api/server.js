// remember express by default cannot parse JSON in request bodies
// global middlewares and the user's router need to be connected here



const express = require('express');
const server = express(); // creates the server

server.use(express.json()); // parse JSON

// Name this router what you want! Then when you server.use it, it needs a path then your variable name.
const usersRouter = require('./users/users-router'); // import the users router
server.use('/api/users', usersRouter); // connect the users router to the server (not sure exactly why it is like this.)



// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });





// Catch all
server.use('*', (req, res) => {
  res.status(404).json({
    message: 'not found ???????????'
  });
});


module.exports = server;