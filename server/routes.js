

const MongoObjectID = require('mongodb').ObjectID;

module.exports = function (app, path, database, cors, bcrypt, bodyParser) {
    app.use(cors());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
  
    app.listen(3000, () => {
      console.log('listening on 3000.');
    });
    /**
   * ROOT
   * TYPE - GET
   * @res API Homepage
   * Test Passed
   */
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/server.html'));
  });

   /**
   * Initialization Interface
   * TYPE - GET
   * @res operation status
   * Test Passed
   */
  app.get('/initialize', (req, res) => {
    database.collection('users').findOne({
      email: 'admin@moviedb.com'
    }, (err, item) => {
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
              return res.status(500).send(err);
            }
            console.log('initiated user');

            let movies = new Array();
            movies = config.movieData;

            let reqCount = 0;
            movies.forEach((movie, index) => {
              database.collection('movies').save(movie, (err, result) => {
                if (!err) reqCount++;
                if (reqCount == movies.length) {
                  res.status(200).send("database initiated");
                }
              });
            })
          });
        });
      } else {
        res.status(200).send("already initiated");
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


  /**
   * Add New Movie Interface
   * TYPE - POST
   * @req.body movie object
   * @res operation status
   * Test Passed
   */
  app.post('/api/addmovie', (req, res) => {
    database.collection('movies').save(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.status(201).send('saved successfully');
    })
  });


  /**
   * Movie Delete Interface
   * TYPE - DELETE
   * @req.body movie object to delete
   * @res operation status
   * Test Passed
   */
  app.delete('/api/deletemovie', (req, res) => {
    database.collection('movies').deleteOne({
      "_id": new MongoObjectID(req.query.movieId)
    }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.status(200).send('movie deleted');
    });
  });

  /**
   * Movie Update Interface
   * TYPE - PUT
   * @req.body.oldmovie movie object to update
   * @req.body.newmovie movie object with new values
   * @res operation status
   * Test Passed
   */
  app.put('/api/updatemovie', (req, res) => {
    // console.log(req.body);
    database.collection('movies').updateOne({
      "_id": new MongoObjectID(req.body.oldmovie['_id'])
    }, {
      $set: {
        name: req.body.newmovie.name,
        year: req.body.newmovie.year,
        rating: req.body.newmovie.rating,
        genre: req.body.newmovie.genre,
        description: req.body.newmovie.description
      }
    }, {
      upsert: true
    }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.status(200).send('movie updated');
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
        return res.status(500).send(err);
      }
      res.status(201).send('registration successful');
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
    database.collection('users').findOne({
      email: credentials.email
    }, (err, item) => {
      if (item) {
        bcrypt.compare(credentials.password, item.password, (err, passwordMatch) => {
          if (passwordMatch) res.status(200).send({
            "user": item,
            "message": "login success"
          });
          else res.status(401).send("invalid credentials");
        });
      } else {
        res.status(401).send("invalid user");
      }
    })
  });
}