var express = require('express');
var router = express.Router();

// Require our controllers.
var task_controller = require('../controllers/taskController')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//POST request to create task
router.post('/tasks', task_controller.task_create)

router.get('/tasks', task_controller.get_tasks)

router.put('/task/association/:id', task_controller.update_user);

router.put('/task/disassociation/:id', task_controller.delete_user);

router.put('/task/disassociationProject/:id', task_controller.delete_association)

router.put('/task/perc/:id', task_controller.update_progress)

// GET request to get tasks of a user
router.get('/tasks/:username', task_controller.get_taskByUser)

router.delete('/tasks/:id', task_controller.task_delete)

router.put('/task/:id', task_controller.update_project);

router.get('/task/:id', task_controller.get_taskById);

router.put('/task/dates/:id', task_controller.update_dates);

module.exports = router;