// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const server = require('./server.js');
const port =  4000;

server.listen(port, () => {
  console.log(`\n*** The Magic on http://localhost:${port} ***\n`);
});