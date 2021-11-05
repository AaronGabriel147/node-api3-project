
// You will need `users-model.js` and `posts-model.js`. 
const express = require('express');
const router = express.Router();

// import models
const Users = require('./users-model') //  Name these model what you want.
const Posts = require('../posts/posts-model')
// get,            // get all users
// getById,        // get by id
// getUserPosts,   // get all posts by user id
// insert,         // insert a new user
// update,         // update user
// remove,         // remove user

// middleware
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware') // ctrl space bar on exports to get them



// GET all users (connected)
router.get('/', (req, res, next) => {
    Users.get()
        .then(users => {
            res.json(users);
        })
        .catch(next);
});



// GET user by id (connected)
router.get('/:id', validateUserId, (req, res, next) => {
    // RETURN THE USER OBJECT
    // this needs a middleware to verify user id
    res.json(req.user);
});

// saved for reference, this is before the middleware*
// Users.getById(req.params.id)
//     .then(user => {
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ message: 'user not found' });
//         }
//     })
//     .catch(next);



// user posts (connected)
router.post('/', validateUser, (req, res, next) => {
    // RETURN THE NEWLY CREATED USER OBJECT
    // this needs a middleware to check that the request body is valid
    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(next);
});


// How to test a put request: GET data, edit data but not ID. 
// Then put the edited data's ID in the URL, and make a put request
// After that do a get req to see if the data is updated.
// {
//     "id": 1,
//      "name": "xxxxxxxxxxxxxxxxxx"   
// }

// PUT user by id (connected)
// RETURN THE FRESHLY UPDATED USER OBJECT
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
router.put('/:id', validateUserId, validateUser, (req, res, next) => {
    Users.update(req.params.id, req.body) // take in the id and the body OR ID & Changes
        .then(user => {
            res.json(user);
        })
        .catch(next);
});


// Old version for reference.
// router.put('/:id', validateUserId, (req, res, next) => {
//     Users.update(req.params.id, req.body) // take in the id and the body OR ID & Changes
//         .then(user => {
//             if (user) {
//             res.json(user);
//             } else {
//                 res.status(404).json({ message: 'user not found' });
//             }
//         })
//         .catch(next);
// });



//  How to test a delete: get all data, add the param ID to the URL, make a delete request. 
// Then get all and see how many are left
//  DELETE user by id (connected)
//  Remove just take one param.
// RETURN THE FRESHLY DELETED USER OBJECT
// this needs a middleware to verify user id
router.delete('/:id', validateUserId, (req, res, next) => {
    Users.remove(req.params.id)
        .then(user => {
            res.status(200).json(user);

        })
        .catch(next);
})


// Saved for reference.
// router.delete('/:id', validateUserId, (req, res, next) => {
//     Users.remove(req.params.id)
//         .then(user => {
//             if (user) {
//                 res.status(200).json(user);
//             } else {
//                 res.status(404).json({ message: 'user not found' });
//             }
//         })
//         .catch(next);
// })




// GET user posts (connected)
// RETURN THE ARRAY OF USER POSTS
// this needs a middleware to verify user id
router.get('/:id/posts', validateUserId, validatePost, (req, res, next) => {
    Users.getUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(next);
});


// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
// const newPost = req.body // something I tried. 

//  I was stuck for 1.5 hours because I was entering the wrong json object into the HTTP client.
//  I did not have user_id in the json object. It must be like this:
// NOTE that the user_id must match the user_id in the URL. --> http://localhost:5000/api/users/2/posts
// {
//     "user_id": 2,
//     "text": "Not su,re how to test this POST"
// }

//  I had it like this:
// {
//     "text": "Not sure how to test this POST",
//     "postedBy": "Nobody"
// }


router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
    const newPost = { user_id: req.params.id, ...req.body }
    Posts.insert(newPost)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(next);
});


module.exports = router;