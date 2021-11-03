
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const express = require('express');
const router = express.Router();

// import model
const Users = require('./users-model') //  Name this model what you want.
// get,
// getById,
// getUserPosts,
// insert,
// update,
// remove,


// GET all users (connected)
router.get('/', (req, res) => {
    Users.get()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
        });
});

// GET user by id (connected)
router.get('/:id', (req, res) => {
    // RETURN THE USER OBJECT
    // this needs a middleware to verify user id
    Users.getById(req.params.id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
        });
});

// GET user posts (connected)
router.post('/', (req, res) => {
    // RETURN THE NEWLY CREATED USER OBJECT
    // this needs a middleware to check that the request body is valid
    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
        });
});

router.put('/:id', (req, res) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    Users.update(req.params.id, req.body)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
        });
});

// router.delete('/:id', (req, res) => {
//   // RETURN THE FRESHLY DELETED USER OBJECT
//   // this needs a middleware to verify user id
// });

// router.get('/:id/posts', (req, res) => {
//   // RETURN THE ARRAY OF USER POSTS
//   // this needs a middleware to verify user id
// });

// router.post('/:id/posts', (req, res) => {
//   // RETURN THE NEWLY CREATED USER POST
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });


module.exports = router;

