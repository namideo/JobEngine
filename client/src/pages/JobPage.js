import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_JOB_ID } from '../utils/queries';
import { Link } from 'react-router-dom';

const JobPage = () => {

    const { jobId } = useParams();

    const { loading, data } = useQuery(GET_JOB_ID, {
      variables: { jobId: jobId },
    });
    console.log(data);

    const job = data?.jobPostings || [];


    return (
        <div>
      
          <div className="card mb-3">
            <div className="card-header">
            <Link
                  className="btn btn-primary btn-block btn-squared"
                  to={``}
                >
                  Apply For Job
            </Link>
            </div>
            <div className="card-body bg-light p-2">
              <h5>{job.title}</h5>
              <p>Open Positions: {job.openPositions}</p>
              <p>Description: {job.description}</p>
              <p>Skill Set: {job.skillSet}</p>
              <p>Experience Required: {job.workExperience}</p>
              <p>Min Salary: {job.minSalary}</p>
              <p>Max Salary: {job.maxSalary}</p>
              <p>Recruiter: {job.recruiter}</p>

            </div>
            <div className="card-footer">
              <span style={{ fontSize: '1rem' }}>
                Job posted at: {job.datePosted}
              </span>
            </div>
          </div>
        
    </div>
    )
}

export default JobPage;