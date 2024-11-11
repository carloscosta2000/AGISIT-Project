var express = require('express');
var router = express.Router();

// Require our controllers.
var user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// GET request for list of users 
router.get('/users', user_controller.users_list);

//GET request for a user
router.get('/user/:username', user_controller.get_user);

// POST request for creating a user
router.post('/users', user_controller.user_create);

// POST request for checking login
router.post('/users/:username', user_controller.check_login);

module.exports = router;