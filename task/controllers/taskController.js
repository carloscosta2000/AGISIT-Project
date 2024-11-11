var Task = require('../models/task')
var Project = require('../models/project')
//var async = require('async')

var task;
exports.get_taskByUser = function (req, res, next) {

    Task.find({'user': req.params.username})
        .sort([['taskName', 'ascending']])
        .exec(function (err, list_tasks) {
            if (err) { console.log(err); return next(err); }
            res.json(list_tasks)
        })

};

exports.get_tasks = function (req, res, next) {

    Task.find()
        .sort([['taskName', 'ascending']])
        .exec(function (err, list_tasks) {
            if (err) { console.log(err); return next(err); }
            res.json(list_tasks)
        })

};

exports.get_taskById = function (req, res, next) {

    Task.findById(req.params.id)
        .exec(function (err, task) {
            if (err) { return next(err); }
            // Successful, so render.
            res.json(task);
        })

};

// Delete a Task.
exports.task_delete = function (req, res, next) {
    Task.findByIdAndRemove(req.params.id, function deleteTask(err) {
        if (err) { return next(err); }
        res.json('Task succesfully removed from the database.')
    })

};

// Create a task.
exports.task_create = function (req, res, next) {
    console.log("Lista no backend: " + req.body.user)
    var users = []
    users.push(req.body.user[0])
    console.log(users)
    
    var task = new Task(
        {
            taskName: req.body.taskName,
            priority: req.body.priority,
            progressPerc: req.body.progressPerc,
            //user: req.body.user,
            user: users,
            project: req.body.project,
            //startDate: req.body.startDate,
            //endDate: req.body.endDate
        }
    );
    console.log(task)

    task.save(function (err) {
        if (err) { 
            console.log(err)
            return next(err); } else {

            res.json(task);

        }
        
    });

};

exports.update_project = function (req, res, next) {
    
    console.log("taskId: " + req.body.taskId)
    console.log("projectId: " + req.body.project)
    Task.findById(req.body.taskId)
        .exec(function (err, task) {
            if (err) { return next(err); }
            Project.findById(req.body.project)
                .exec(function (err, project) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    //console.log("Task " + task)
                    console.log("Project " + project)
                    var updatedTask = new Task({
                        _id: task.id,
                        taskName: task.taskName,
                        priority: task.priority,
                        progressPerc: task.progressPerc,
                        user: task.user,
                        project: project.acronym,
                        startDate: task.startDate,
                        endDate: task.endDate
                    })
                    //console.log("Updated task " + updatedTask)
                    Task.findByIdAndUpdate(req.body.taskId, updatedTask, {}, function (err, theTask) {
                        if (err) { return next(err);}
                        // Successful - redirect to genre detail page.
                        res.json('Task succesfully updated.');
                        
                    });
        })
    })

};


exports.delete_association = function (req, res, next) {
    
    console.log("taskId: " + req.body.taskId)
    console.log("username: " + req.body.projectAcronym)
    
    Task.findById(req.body.taskId).exec(function (err, task) {
        if (err) { return next(err); }
        task.user.push(req.body.username)
        console.log(task.id)

        var updatedTask = new Task({
            _id: task.id,
            taskName: task.taskName,
            priority: task.priority,
            progressPerc: task.progressPerc,
            user: task.user,
            project: ""
        })
        Task.findByIdAndUpdate(req.body.taskId, updatedTask, {}, function (err, theTask) {
            if (err) { return next(err);}
            // Successful - redirect to genre detail page.
            res.json('Task succesfully updated.');
        });
                   
    });
};

exports.update_user = function (req, res, next) {
    
    console.log("taskId: " + req.body.taskId)
    console.log("username: " + req.body.username)
    
    Task.findById(req.body.taskId).exec(function (err, task) {
        if (err) { return next(err); }
        if (!task.user.includes(req.body.username))
            task.user.push(req.body.username)
        console.log(task.user)

        var updatedTask = new Task({
            _id: task.id,
            taskName: task.taskName,
            priority: task.priority,
            progressPerc: task.progressPerc,
            user: task.user,
            project: task.project
        })
        Task.findByIdAndUpdate(req.body.taskId, updatedTask, {}, function (err, theTask) {
            if (err) { return next(err);}
            // Successful - redirect to genre detail page.
            res.json('Task succesfully updated.');
        });
                   
    });
};

exports.delete_user = function (req, res, next) {
    
    console.log("taskId: " + req.body.taskId)
    console.log("username: " + req.body.username)
    
    Task.findById(req.body.taskId).exec(function (err, task) {
        if (err) { return next(err); }

        const newUserList = []
        for(const user of task.user)
            if(user != req.body.username)
                newUserList.push(user)

        console.log(newUserList)            

        var updatedTask = new Task({
            _id: task.id,
            taskName: task.taskName,
            priority: task.priority,
            progressPerc: task.progressPerc,
            user: newUserList,
            project: task.project
        })
        Task.findByIdAndUpdate(req.body.taskId, updatedTask, {}, function (err, theTask) {
            if (err) { return next(err);}
            // Successful - redirect to genre detail page.
            res.json('Task succesfully updated.');
        });
                   
    });
};

exports.update_progress = function (req, res, next) {
    console.log("taskId: " + req.params.id)
    
    Task.findById(req.params.id).exec(function (err, task) {
        if (err) { return next(err); }
        console.log("previous perc: " + task.progressPerc)
        var updatedTask = new Task({
            _id: task.id,
            taskName: task.taskName,
            priority: task.priority,
            progressPerc: req.body.perc,
            user: task.user,
            project: task.project
        })
        console.log("update to : " + updatedTask.progressPerc)
        Task.findByIdAndUpdate(req.params.id, updatedTask, {}, function (err, theTask) {
            if (err) { return next(err);}
            // Successful - redirect to genre detail page.
            res.json('Task succesfully updated.');
        });
                   
    });
    
};

exports.update_dates = async function (req, res, next) {
    console.log("taskId: " + req.params.id)
    //get tasks diferentes da que esta a ser atualizada, em que o user ta, prioridade urgente e nao tao completas
    let userUrgentTasks  = await Task.find({user: req.body.user, priority: "Urgente", progressPerc: { $ne: 100}, _id: { $ne: req.params.id}}).lean().exec();
    let userUrgentTasksFiltered = []
    //Filtrar para apenas ter as tasks que teem uma ou mais dos campos das datas definidos 
    for (let userUrgentTask of userUrgentTasks) {
        if (userUrgentTask.startDate != undefined || userUrgentTask.endDate != undefined)
            userUrgentTasksFiltered.push(userUrgentTask)
    }
    //userUrgentTasks.filter(userUrgentTask => userUrgentTask.startDate != undefined || userUrgentTask.endDate != undefined)
    //let userUrgentTasks  = await Task.find({user: req.body.user, priority: "Urgente", progressPerc: { $ne: 100}, $not: {$and: [{startDate: { $ne : undefined}, endDate: { $ne : undefined},}]}}).lean().exec();
    console.log(userUrgentTasksFiltered)
    let overlaps = false;
    for (let userUrgentTask of userUrgentTasksFiltered) {
        let possibleTaskStartDateValue = null;
        let possibleTaskEndDateValue = null;
        let userUrgentTaskStartDateValue = null;
        let userUrgentTaskEndDateValue = null;
        if (req.body.startDate == undefined || req.body.startDate == null) {
            possibleTaskStartDateValue = Number.NEGATIVE_INFINITY
        } else {
            possibleTaskStartDateValue = new Date(req.body.startDate).getTime() 
        }
        if (req.body.endDate == undefined || req.body.endDate == null) {
            possibleTaskEndDateValue = Number.POSITIVE_INFINITY
        } else {
            possibleTaskEndDateValue = new Date(req.body.endDate).getTime() 
        }
        if (userUrgentTask.startDate == undefined || userUrgentTask.startDate == null) {
            userUrgentTaskStartDateValue = Number.NEGATIVE_INFINITY
        } else {
            userUrgentTaskStartDateValue = new Date(userUrgentTask.startDate).getTime() 
        }
        if (userUrgentTask.endDate == undefined || userUrgentTask.endDate == null) {
            userUrgentTaskEndDateValue = Number.POSITIVE_INFINITY
        } else {
            userUrgentTaskEndDateValue = new Date(userUrgentTask.endDate).getTime() 
        }

        if (is_overlapping(possibleTaskStartDateValue, possibleTaskEndDateValue, userUrgentTaskStartDateValue, userUrgentTaskEndDateValue)) {
            overlaps = true
            console.log("Task com que da overlap")
            console.log(userUrgentTask)
        }
    }
    if (!overlaps) {
        Task.findById(req.params.id).exec(function (err, task) {
            if (err) { return next(err); }
            var updatedTask = new Task({
                _id: task.id,
                taskName: task.taskName,
                priority: task.priority,
                progressPerc: task.progressPerc,
                user: task.user,
                project: task.project,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            })
            Task.findByIdAndUpdate(req.params.id, updatedTask, {}, function (err, theTask) {
                if (err) { return next(err);}
                // Successful - redirect to genre detail page.
                res.json('Task succesfully updated.');
            });
                       
        });
    } else {
        //houve um overlap. logo nao podemos adicionar as datas a task
        res.json('ERROR')
    }
    
};

function is_overlapping(x1,x2,y1,y2) {
    console.log(x1)
    console.log(x2)
    console.log(y1)
    console.log(y2)

    return Math.max(x1,y1) < Math.min(x2,y2)
}






