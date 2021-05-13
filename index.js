require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3001;
// const bodyParser = require('body-parser');

async function runServer() {
  await require('./db').connect();

  server.use(express.json());
  server.use('/api/v1/portfolios', require('./routes/portfolios'));

  const PORT = parseInt(process.env.PORT, 10) || 3001;
  server.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log('Server ready on port:', PORT);
  });
}

runServer();
