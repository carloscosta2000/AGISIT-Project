var express = require('express');
var router = express.Router();

// Require our controllers.

var project_controller = require('../controllers/projectController'); 

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// GET reqest for geting projects
router.get('/projects', project_controller.project_list);
// POST request for creating project 
router.post('/projects', project_controller.project_create);

router.get('/project/:acronym', project_controller.project_getByAcronym);

router.get('/projects', project_controller.project_list)

router.get('projects', project_controller.project_list)

module.exports = router;