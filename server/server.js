const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let fs = require('fs');
let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
let database;


let db_url = "mongodb://" + config.database.user + ":" + config.database.password + "@" + config.database.host;
MongoClient.connect(db_url, (err, dbase) => {
  if (err) return console.log(err);
  database = dbase;

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.listen(3000, () => {
    console.log('listening on 3000.');
  });

  app.get('/initialize', (req, res) => {
    database.collection('users').findOne({email:'admin@moviedb.com'}, (err, item) => {
      // item is the existing user object
    });
  });

  app.get('/movies', (req, res) => {
    database.collection('movies').find().toArray(function (err, results) {
      console.log(results);
      res.send(results);
    });
  });

  app.post('/addmovie', (req, res) => {
    console.log(req.body);
    database.collection('movies').save(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.send(500, err);
      }
      console.log('saved to database')
      res.send(201, 'saved successfully');
    })
  });

  app.delete('/deletemovie', (req, res) => {
    database.collection('movies').findOneAndDelete({
      "_id": req.body['_id']
    }, (err, result) => {
      if (err) {
        console.log(err);
        return res.send(500, err);
      }
      console.log('movie deleted');
      res.send(200, 'movie deleted');
    });
  });

  app.put('/updatemovie', (req, res) => {
    database.collection('movies').findOneAndUpdate({
      "_id": req.body.oldmovie['_id']
    }, {
      $set: {
        name: req.body.newmovie.name,
        year: req.body.newmovie.year,
        rating: req.body.newmovie.rating
      }
    }, {
      sort: {
        _id: -1
      },
      upsert: true
    }, (err, result) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      console.log('movie updated');
      res.send(200, result)
    });
  });

  /**
   * User Registration Interface
   * @req.body user object
   * @res operation status
   * 
   */
  app.post('/user/register', (req, res) => {
    console.log(req.body);
    req.body['type'] = "standard";
    database.collection('users').save(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.send(500, err);
      }
      console.log('saved registration');
      res.send(201, 'registration successful');
    })
  });

});