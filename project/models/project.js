var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var ProjectSchema = new Schema({
    projectName: { type: String, required: true, maxLength: 100 },
    acronym: { type: String, required: true, maxLength: 3 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false}
});

// Virtual for this user's name.
ProjectSchema.virtual('name').get(function() {
    return this.projectName;
});



// Export model.
module.exports = mongoose.model('Project', ProjectSchema);