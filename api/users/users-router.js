
// You will need `users-model.js` and `posts-model.js`
// The middleware functions also need to be required

const express = require('express');
const router = express.Router();

// import models
const Users = require('./users-model') //  Name this model what you want.
const Posts = require('../posts/posts-model')
// get,            // get all users
// getById,        // get by id
// getUserPosts,   // get all posts by user id
// insert,         // insert a new user
// update,         // update user
// remove,         // remove user


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


// How to test a put request: GET data, edit data but no ID. Then put the edited datas ID in the URL and make a put request
// {
//     "id": 1,
//      "name": "xxxxxxxxxxxxxxxxxx"   
// }
// PUT user by id (connected)
router.put('/:id', (req, res) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    Users.update(req.params.id, req.body) // take in the id and the body OR ID & Changes
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


//  How to test a delete: get all data, add the param ID to the URL, make a delete request. Then get all and see how many are left
//  DELETE user by id (connected)
//  Remove just take one param.
router.delete('/:id', (req, res) => {
    // RETURN THE FRESHLY DELETED USER OBJECT
    // this needs a middleware to verify user id
    Users.remove(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
        })
})

// GET user posts (connected)
router.get('/:id/posts', (req, res) => {
    // RETURN THE ARRAY OF USER POSTS
    // this needs a middleware to verify user id
    Users.getUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong with getting posts' });
        })
});






//  post-model.js helper function for reference:

// function insert(post) {
//     return db('posts') // TODO: add user id
//       .insert(post) // returns id
//       .then(ids => { // ids is an array of the inserted ids
//         return getById(ids[0]); // returns the inserted post
//       });
//   }

// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
// const newPost = req.body
router.post('/:id/posts', (req, res) => {
    const newPost = { user_id: req.params.id, ...req.body }
    console.log(newPost)
    Posts.insert(newPost)
        .then(post => {
            console.log('.then log', post)
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
        });
});









// router.post("/:id/posts", (req, res) => {
//     const newPost = { ...req.body, user_id: req.params.id };
//     Posts.insert(newPost)
//         .then((post) => res.status(201).json(post))
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ message: "Something went wrong" });
//         });
// });









// try {
//     const end = await Post.insert({
//       user_id: req.params.id,
//       text: req.body.text,
//     });
//     res.status(201).json(end);


// //__________________________________________

//     const postInfo = {...req.body, user_id: req.params.id}
//     Post.insert(postInfo)
//     .then(post => {
//       res.status(200).json(post)
//     })
//     .catch(error => {
//       res.status(500).json({ message: error.message})
//     })








module.exports = router;