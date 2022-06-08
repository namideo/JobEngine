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

