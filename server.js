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

server.get('/accounts/:id', (req, res) => {
  const { id } = req.params
  db('accounts')
    .where({ id })
    .first()
    .then(account => {
      res.status(200).json(account)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.post('/accounts', (req, res) => {
  const newAccount = req.body
  db('accounts').insert(newAccount, 'id')
    .then(([id]) => {
      db('accounts')
        .where({ id })
        .first()
        .then(post => {
          res.status(201).json(post)
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })

})

module.exports = server;