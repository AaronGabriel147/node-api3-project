const db = require('../../data/db-config');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};


function get() {
  return db('posts');
}


function getById(id) {
  return db('posts')
    .where({ id })
    .first();
}


function insert(post) {
  return db('posts') // TODO: add user id
    .insert(post) // returns id
    .then(ids => { // ids is an array of the inserted ids
      return getById(ids[0]); // returns the inserted post
    });
}


function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes);
}


function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}
