const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get('/accounts', (req, res) => {
  db('accounts')
    .select('*')
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = server;