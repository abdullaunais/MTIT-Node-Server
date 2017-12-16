const path = require('path');
const bcrypt = require('bcrypt');

class AppController {
    constructor(database) {
        this.database = database;
    }

    getRoot(req, res) {
        res.sendFile(path.join(__dirname + '/server.html'));
    }

    initialize(req, res) {
        this.database.collection('users').findOne({
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
    }
}

module.exports = AppController;