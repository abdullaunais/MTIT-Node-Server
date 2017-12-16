const bcrypt = require('bcrypt');

class UserController {
    constructor(database) {
        this.database = database;
    }

    authenticate(req, res) {
        let credentials = req.body;
        this.database.collection('users').findOne({
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
        });
    }

    registerUser(req, res) {
        console.log(req.body);
        req.body['type'] = "standard";
        this.database.collection('users').save(req.body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.status(201).send('registration successful');
        });
    }
}

module.exports = UserController;