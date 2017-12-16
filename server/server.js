const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

let MongoClient = require('mongodb').MongoClient;

let fs = require('fs');
let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
let database;


let db_url = "mongodb://" + config.database.user + ":" + config.database.password + "@" + config.database.host;
MongoClient.connect(db_url, (err, dbase) => {
  if (err) return console.log(err);
  database = dbase;
  require('./routes')(app, path, database, cors, bcrypt, bodyParser);
});