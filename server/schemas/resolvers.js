const { User, JobPost } = require('../models');
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
            throw new AuthenticationError("Please login!");
        },

        // Get job listings which include the keyword in the 'title' or 'description' fields.
        jobPostings: async (parent, { keyword }) => {
            // Regex used to find the keyword and 'i' is for case insensitivity
            const regex = new RegExp(keyword, "i");
            return await JobPost.find({
                $or: [{ title: regex }, { description: regex }],
            }).populate('recruiter');
        }

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
    }
};

module.exports = resolvers;
