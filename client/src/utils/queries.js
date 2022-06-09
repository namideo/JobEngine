import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me {
        _id
        username
        email
        role
    }
}
`;

export const GET_JOBPOSTINGS = gql`
query jobPostings ($keyword: String!){
    jobPostings(keyword: $keyword) {
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


}`