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
    title: String!
    openPositions: Int
    description: String!
    datePosted: String
    minSalary: Int
    maxSalary: Int
    skillSet: [String]
    workExperience: String
    recruiter: User
}

input jobInput {
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
    jobPostings(keyword: String!) : [JobPost]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, role: String!): Auth
    addJobPost(input: jobInput): JobPost
}`;

module.exports = typeDefs;