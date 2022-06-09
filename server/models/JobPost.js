const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const jobPostSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    openPositions: {
        type: Number
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    datePosted: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    minSalary: {
        type: Number,
    },
    maxSalary: {
        type: Number,
    },
    skillSet: [{
        type: String,
    }],
    workExperience: {
        type: String,
    },
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    applications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Application',
        },
    ]
});

const JobPost = model('JobPost', jobPostSchema);

module.exports = JobPost;
