var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var TaskSchema = new Schema({
    taskName: { type: String, required: true, maxLength: 100 },
    priority: { type: String, enum: ['Urgente', 'Alta', 'Média', 'Baixa'], default: 'Média', required: true},
    progressPerc: { type: Number, default: 0, required: true },
    user: [{ type: String, required: false}],
    project: {type: String, required: false},
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false}
});

// Virtual for this task's name.
TaskSchema.virtual('name').get(function() {
    return this.taskName;
});



// Export model.
module.exports = mongoose.model('Task', TaskSchema);