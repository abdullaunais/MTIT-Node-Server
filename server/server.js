const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let fs = require('fs');
let path = require('path');
let cors = require('cors');
let bcrypt = require('bcrypt');
let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
let database;


let db_url = "mongodb://" + config.database.user + ":" + config.database.password + "@" + config.database.host;
MongoClient.connect(db_url, (err, dbase) => {
  /**
   * ROOT
   * TYPE - GET
   * @res Homepage
   * Test Passed
   */
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/server.html'));
  });

  if (err) return console.log(err);
  database = dbase;

  app.use(cors());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.listen(3000, () => {
    console.log('listening on 3000.');
  });


  /**
   * Initialization Interface
   * TYPE - GET
   * @res operation status
   * Test Passed
   */
  app.get('/initialize', (req, res) => {
    database.collection('users').findOne({ email: 'admin@moviedb.com' }, (err, item) => {
      if (!item) {
        // item is the existing user object
        bcrypt.hash('admin123', 5, (err, bcryptedPassword) => {
          //save to db
          let user = {
            "name": "Nutt Loose",
            "email": "admin@moviedb.com",
            "password": bcryptedPassword,
          };
          database.collection('users').save(user, (err, result) => {
            if (err) {
              console.log(err);
              return res.send(500, err);
            }
            console.log('initiated user');

            let movies = new Array();
            movies = config.movieData;

            let reqCount = 0;
            movies.forEach((movie, index) => {
              database.collection('movies').save(movie, (err, result) => {
                if (!err) reqCount++;
                if (reqCount == movies.length) {
                  res.send(200, "database initiated");
                }
              });
            })
          });
        });
      } else {
        res.send(200, "already initiated");
      }
    });
  });

  /**
 * Get Movie List Interface
 * TYPE - GET
 * @res movie list
 * Test Passed
 */
  app.get('/api/movies', (req, res, next) => {
    database.collection('movies').find().toArray((err, results) => {
      res.json(results);
    });
  });

  app.post('/api/addmovie', (req, res) => {
    console.log(req.body);
    database.collection('movies').save(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.send(500, err);
      }
      res.send(201, 'saved successfully');
    })
  });


  /**
   * Movie Delete Interface
   * TYPE - DELETE
   * @req.body movie object to delete
   * @res operation status
   * Test Not Performed
   */
  app.delete('/api/deletemovie', (req, res) => {
    database.collection('movies').findOneAndDelete({
      "_id": req.body['_id']
    }, (err, result) => {
      if (err) {
        console.log(err);
        return res.send(500, err);
      }
      res.send(200, 'movie deleted');
    });
  });

  /**
   * Movie Update Interface
   * TYPE - PUT
   * @req.body.oldmovie movie object to update
   * @req.body.newmovie movie object with new values
   * @res operation status
   * Test Not Performed
   */
  app.put('/api/updatemovie', (req, res) => {
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
        res.send(200, result)
      });
  });


  /**
   * User Registration Interface
   * TYPE - POST
   * @req.body user object
   * @res operation status
   * Test Not Perfomed
   */
  app.post('/api/user/register', (req, res) => {
    console.log(req.body);
    req.body['type'] = "standard";
    database.collection('users').save(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.send(500, err);
      }
      res.send(201, 'registration successful');
    })
  });


  /**
 * User Login Interface
 * TYPE - POST
 * @req.body.credentials User Credentials
 * @res authentication status
 * Test Not Performed
 */
  app.post('/api/user/auth', (req, res) => {
    let credentials = req.body;
    database.collection('users').findOne({ email: credentials.email }, (err, item) => {
      if (item) {
        bcrypt.compare(credentials.password, item.password, (err, passwordMatch) => {
          if (passwordMatch) res.send(200, "login success");
          else res.send(401, "invalid credentials");
        });
      } else {
        res.send(401, "invalid user");
      }
    })
  });

});