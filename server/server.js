const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

let fs = require('fs');
let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
let database;


let db_url = "mongodb://" + config.database.user + ":" + config.database.password + "@" + config.database.host;
MongoClient.connect(db_url, (err, dbase) => {
  if (err) return console.log(err);
  database = dbase;

  app.listen(3000, () => {
    console.log('listening on 3000.');
  });

  app.get('/', (req, res) => {
    res.send('Hello World');
  });
});