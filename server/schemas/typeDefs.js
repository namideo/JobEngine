const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
}

type Auth {
    token: ID!
    user: User
}

type JobPost {
    _id: ID!
    companyName: String!
    title: String!
    openPositions: Int
    description: String!
    datePosted: String
    minSalary: Int
    maxSalary: Int
    skillSet: [String]
    workExperience: String
    recruiter: User
    applications: [Application]
}

type Application {
    _id: ID!
    contactInfo: String!
    notes: String
    joiningDate: String
    applicant: User
}

input jobInput {
    companyName: String!
    title: String!
    openPositions: Int
    description: String!
    datePosted: String
    minSalary: Int
    maxSalary: Int
    skillSet: [String]
    workExperience: String
}

type Query {
    me: User
    jobPostings(keyword: String!): [JobPost]
    jobPosting(jobId: ID!): JobPost
    getJobsPostedByUser : [JobPost]
    getJobsAppliedByUser : [JobPost]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, role: String!): Auth
    addJobPost(input: jobInput): JobPost
    addApplication(jobId: ID!, contactInfo: String!, notes: String, joiningDate: String): Application
    editJobPost(id: ID!, openPositions: Int): JobPost
    removeJobPost(jobId: ID!): JobPost
}`;

module.exports = typeDefs;