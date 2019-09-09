const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get('/accounts', (req, res) => {
  const query = req.query
      db('accounts')
        .select('*')
        .limit(query.limit ? query.limit : 99)
        .orderBy(query.sortby ? query.sortby : 'id', query.sortdir ? query.sortdir : 'asc')
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

server.put('/accounts/:id', (req, res) => {
  const changes = req.body
  db('accounts')
    .where('id', req.params.id)
    .update(changes)
    .then(count => {
      res.status(200).json({ message: `Successfully updated ${count} record(s).`})
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.delete('/accounts/:id', (req, res) => {
  db('accounts')
    .where({id: req.params.id})
    .del()
    .then(count => {
      res.status(200).json({ message: `Successfully deleted ${count} records(s).`})
    })
})

module.exports = server;