var User = require('../models/user')

// Display list of all Users.
exports.users_list = function (req, res, next) {
    User.find()
        .sort([['username', 'ascending']])
        .exec(function (err, list_users) {
            if (err) { return next(err); }
            res.json(list_users)
        })
};

// Get a single user.
exports.get_user = function (req, res, next) {
    console.log(req.params.username) 
    User.findOne({'username' : req.params.username})
        .exec(function (err, user) {
            if(user == null){
                return next(err);
            }
            if (err) { return next(err); }
            res.json(user)
        })

};


// Create a User.
exports.user_create = function (req, res, next) {
    var user = new User(
        {
            username: req.body.username,
            password: req.body.password,
            isAdmin: false
        }
    );
    user.save(function (err) {
        if (err) { return next(err); } else {
            // Successful - redirect to new hero record.
            res.json(user);
        }
    });
};

exports.check_login = function (req, res, next) {
    User.find({username: req.body.username, password: req.body.password}, function(err, user) 
    {
       if (err)
       {
           res.send(err);
       }
       res.send(user[0]);
       //res.json(user)
    });

};




