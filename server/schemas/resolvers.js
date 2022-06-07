const { User, JobPost, Application } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({
                    _id: context.user._id
                });
            }
            throw new AuthenticationError("You need to be logged in!");
        },

        // Get a job post by Id
        jobPosting: async (parent, { jobId }, context) => {
            if (context.user) {
                return await JobPost.findOne({
                    _id: jobId
                }).populate('recruiter').populate('applications').populate({
                    path: 'applications',
                    populate: 'applicant' 
                });
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        // Get job posts which include the keyword in the 'title' or 'description' fields.
        jobPostings: async (parent, { keyword }) => {
            // Regex used to find the keyword and 'i' is for case insensitivity
            const regex = new RegExp(keyword, "i");
            return await JobPost.find({
                $or: [{ title: regex }, { description: regex }],
            }).populate('recruiter');
        },

    },
    Mutation: {
        // Verify the user credentials to enable login to the app
        login: async (parent, { email, password }) => {
            // Check if user is found
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }
            const validPwd = await user.isCorrectPassword(password);
            if (!validPwd) {
                throw new AuthenticationError("Wrong password!");
            }
            const token = signToken(user);
            return { token, user };
        },

        // Add a new user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        // Create a new job post
        addJobPost: async (parent, { input }, context) => {
            if (context.user) {
                const jobPost = await JobPost.create({
                    ...input,
                    recruiter: context.user._id
                });
                return jobPost;
            }
            throw new AuthenticationError("You need to be logged in!");
        },

        // Create a new job application
        addApplication: async (parent, args, context) => {
            if (context.user) {
                const application = await Application.create({
                    contactInfo: args.contactInfo,
                    notes: args.notes,
                    joiningDate: args.joiningDate,
                    applicant: context.user._id
                });
                await JobPost.findOneAndUpdate(
                    { _id: args.jobId },
                    { $addToSet: { applications: application } },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                return application;
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    }
};

module.exports = resolvers;
