import { gql } from '@apollo/client';


export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!, $role: String!) {
    addUser(username: $username, email: $email, password: $password,, role: $role) {
        token
        user {
            _id
            username
            role
            email
        }
    }
}
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
        token
        user {
            _id
            username
            role
            email
        }
    }
}
`;

export const POST_JOB = gql`
mutation addJobPost($input: jobInput) {
    addJobPost(input: $input) {
        _id
        companyName
        title
        openPositions
        description
        datePosted
        minSalary
        maxSalary
        skillSet
        workExperience
    }
}
`;

export const APPLY_JOB = gql`
mutation addApplication($jobId: ID!, $contactInfo: String!, $notes: String, $joiningDate: String) {
    addApplication(jobId: $jobId, contactInfo: $contactInfo, notes: $notes, joiningDate: $joiningDate) {
        _id
        contactInfo
        notes
        joiningDate
    }
}
`;

export const UPDATE_JOB = gql`
mutation updateJob($jobId: ID!, $openPositions: Int!) {
    editJobPost(id: $jobId, openPositions: $openPositions) {
        _id
        companyName
        title
        openPositions
        description
        datePosted
        minSalary
        maxSalary
        skillSet
        workExperience
    }
}
`;

export const REMOVE_JOB = gql`
mutation removeJobPost($jobId: ID!) {
    removeJobPost(jobId: $jobId) {
        _id
        companyName
        title
        openPositions
        description
        datePosted
        minSalary
        maxSalary
        skillSet
        workExperience
    }
}
`;
