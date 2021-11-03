// require your server and launch it

const server = require('./api/server.js');  // require your server

const PORT = 5000

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});



// git branch -r
// git checkout -b BRANCH-NAME
// git pull origin BRANCH-NAME
