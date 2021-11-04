// remember express by default cannot parse JSON in request bodies
// global middlewares and the user's router need to be connected here
const express = require('express');
const { logger } = require('./middleware/middleware')
const server = express(); // creates the server
server.use(express.json()); // parse JSON

// Name this router what you want! Then when you server.use it, it needs a path then your variable name.
const usersRouter = require('./users/users-router'); // import the users router
server.use('/api/users', logger, usersRouter); // connect the users router to the server (not sure exactly why it is like this.)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


// *catch all 404 errors*
// calling next with an arg, sends object inside of next() rather than the default 404.
// If you don't call next with an arg, it will just send a 404 error.
server.use('*', (req, res, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` })
});


server.use(errorHandling) // will trap "".catch/500 errors" happening above


module.exports = server;

// *catch all 500 errors middleware* 
// Now all .catch's will be handled by the error handling middleware
// All .catch/500 error's now look like this: .catch(next)
// You can also use .catch(err => next(err)) 
// connect this with server.use at the end of the pipeline

// Explanation:
// If there are 4 args in a global function, Express will automatically fire it when -
// nothing accepts the 'next()' in any given endpoint.
// This is the last line of defense by the server.

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  })
}