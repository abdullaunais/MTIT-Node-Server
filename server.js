const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient

let database;
let db_user = "root";
let db_password = "102203330MTIT";
let db_host = "ds149201.mlab.com:49201/mtit";
let db_url = "mongodb://" + db_user + ":" + db_password + "@" + db_host;

MongoClient.connect(db_url, (err, dbase) => {
  if (err) return console.log(err);
  database = dbase;

  app.listen(3000, () => {
    console.log('May Node be with you');
    console.log('listening on 3000.')
  });

  app.get('/', (req, res) => {
    res.send('Hello World');
  });
});