
const AppController = require('./controllers/app-controller');
const MovieController = require('./controllers/movie-controller');
const UserController = require('./controllers/user-controller');

const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function (app, database) {
    // Controller List
    const appController = new AppController(database);
    const movieController = new MovieController(database);
    const userController = new UserController(database);


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
        appController.getRoot(req, res);
    });

    /**
    * Initialization Interface
    * TYPE - GET
    * @res operation status
    * Test Passed
    */
    app.get('/initialize', (req, res) => {
        appController.initialize(req, res);
    });

    /**
     * Get Movie List Interface
     * TYPE - GET
     * @res movie list
     * Test Passed
     */
    app.get('/api/movies', (req, res) => {
        movieController.getAllMovies(req, res);
    });


    /**
     * Add New Movie Interface
     * TYPE - POST
     * @req.body movie object
     * @res operation status
     * Test Passed
     */
    app.post('/api/addmovie', (req, res) => {
        movieController.addMovie(req, res);
    });


    /**
     * Movie Delete Interface
     * TYPE - DELETE
     * @req.body movie object to delete
     * @res operation status
     * Test Passed
     */
    app.delete('/api/deletemovie', (req, res) => {
        movieController.deleteMovie(req, res);
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
        movieController.updateMovie(req, res);
    });


    /**
     * User Registration Interface
     * TYPE - POST
     * @req.body user object
     * @res operation status
     * Test Not Perfomed
     */
    app.post('/api/user/register', (req, res) => {
        userController.registerUser(req, res);
    });


    /**
     * User Login Interface
     * TYPE - POST
     * @req.body.credentials User Credentials
     * @res authentication status
     * Test Not Performed
     */
    app.post('/api/user/auth', (req, res) => {
        userController.authenticate(req, res);
    });
}