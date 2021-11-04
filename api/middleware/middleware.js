const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

// *LOGGER* middleware runs on every request made to the API
// next(); // must call next to move on to the next middleware
// *** HOW TO CONNECT: In server you need 2 things:
// [1] = is an import =   const { logger } = require('./middleware/middleware')
// [2] = is a use =       server.use('/api/users', logger, usersRouter);
function logger(req, res, next) {
  console.log(`it is a ${req.method} request to ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
}




// this middleware will be used for all user endpoints that include an `id` parameter in the url -
// example: `/api/users/:id` and it should check the database to make sure there is a user with that id.

// if the `id` parameter is valid, store the user object as `req.user` and allow the request to continue
// if the `id` parameter does not match any user id in the database, respond with status `404` and `{ message: "user not found" }

// Users.get returns an array of user objects from the database.

// Officially connected my first middleware other than error handlers and what not.



// LEFT OFF AT 120:00 of Gabriels video... TIME TO EAT DINNER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        next({ status: 404, message: 'User ID not found' })
      }
    })
    .catch(next)

}

// router.get('/:id', (req, res, next) => {
//   Users.getById(req.params.id)
//       .then(user => {
//           if (user) {
//               res.status(200).json(user);
//           } 
// });














// validateUser validates the `body` on a request to create or update a user
// if the request `body` lacks the required `name` field, 
// respond with status 400 and { message: "missing required name field" }
function validateUser(req, res, next) {
}



// validatePost validates the body on a request to create a new post
// if the request `body` lacks the required `text` field, respond with status `400` and `{ message: "missing required text field" }`
function validatePost(req, res, next) {
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
