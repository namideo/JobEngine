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

export const GET_JOB_ID = gql`
query jobPosting ($jobId: ID!) {
    jobPosting (jobId: $jobId) {
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
        recruiter{
            _id
            username
            email
        }
        applications{
            _id
            contactInfo
            notes
            joiningDate
            applicant{
                _id
                username
                email
            }
        }
    }


}
`;

export const GET_JOBS_POSTED_BY_USER = gql`
query getJobsPostedByUser {
    getJobsPostedByUser  {
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
        recruiter{
            username
            email
        }
        applications{
            _id
            contactInfo
            notes
            joiningDate
            applicant{
                _id
                username
                email
            }
        }
    }


}
`;

export const GET_JOBS_APPLIED_BY_USER = gql`
query getJobsAppliedByUser {
    getJobsAppliedByUser {
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
        recruiter{
            username
            email
        }
        applications{
            _id
            contactInfo
            notes
            joiningDate
            applicant{
                _id
                username
                email
            }
        }
    }


}
`;
