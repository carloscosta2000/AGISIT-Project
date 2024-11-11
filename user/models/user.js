var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 },
    isAdmin: { type: Boolean, required: true },
});

// Virtual for this user's name.
UserSchema.virtual('name').get(function() {
    return this.username;
});

UserSchema.virtual('Admin').get(function() {
    return this.isAdmin;
});


// Export model.
module.exports = mongoose.model('User', UserSchema);