var Project = require('../models/project')
//var async = require('async')

// Display list of all projects.
exports.project_list = function (req, res, next) {
    console.log("aqui")
    Project.find()
        .sort([['projectName', 'ascending']])
        .exec(function (err, list_projects) {
            if (err) { return next(err); }
            res.json(list_projects)
        })

};

// Get a single project.
exports.get_project = function (req, res, next) {
    Project.findOne({'projectName' : req.params.projectName})
        .exec(function (err, project) {
            if(project == null){
                return next(err);
            }
            if (err) { return next(err); }
            res.json(project)
        })

};

exports.project_getByAcronym = function (req, res, next) {
    Project.findOne({'acronym' : req.params.acronym})
        .exec(function (err, project) {
            if(project == null){
                return next(err);
            }
            if (err) { return next(err); }
            res.json(project)
        })

};

// Create a project.
exports.project_create = function (req, res, next) {
    var project = new Project(
        {
            projectName: req.body.projectName,
            acronym: req.body.acronym,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }
    );

    project.save(function (err) {
        if (err) { return next(err); } else {

            // Successful - redirect to new hero record.
            res.json(project);

        }
        
    });

};







