const MongoObjectID = require('mongodb').ObjectID;

class MovieController {
    constructor(database) {
        this.database = database;
    }
    getAllMovies(req, res) {
        this.database.collection('movies').find().toArray((err, results) => {
            res.json(results);
        });
    }

    addMovie(req, res) {
        this.database.collection('movies').save(req.body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.status(201).send('saved successfully');
        });
    }

    deleteMovie(req, res) {
        this.database.collection('movies').deleteOne({
            "_id": new MongoObjectID(req.query.movieId)
        }, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.status(200).send('movie deleted');
        });
    }

    updateMovie(req, res) {
        // console.log(req.body);
        this.database.collection('movies').updateOne({
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
    }
}

module.exports = MovieController;