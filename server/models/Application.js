const { Schema, model } = require('mongoose');

const applicationSchema = new Schema({
    contactInfo: {
        type: String,
        required: true,
    },
    notes: {
        type: String
    },
    joiningDate: {
        type: Date
    },
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Application = model('Application', applicationSchema);

module.exports = Application;