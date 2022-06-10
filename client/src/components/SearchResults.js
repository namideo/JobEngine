import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_JOBPOSTINGS } from '../utils/queries';
import { Link } from 'react-router-dom'
import { SearchForm } from '../components/SearchForm';

function SearchResults() {

      const { keyword } = useParams();

      const { loading, data } = useQuery(GET_JOBPOSTINGS, {
        variables: { keyword: keyword },
      });
      // console.log(data);

      const jobs = data?.jobPostings || [];

      if (loading) {
        return <h2>LOADING...</h2>;
      }

    return (

  <div className='Results'>
          <p className="jobResults"><strong>Job results</strong></p>

    <div>
      {jobs &&
        jobs.map((job) => (
          <div key={job._id} className="card mb-5">
            <div className="card-header">
            <Link
                  className="btn btn-primary btn-block btn-squared"
                  to={`/JobPage/${job._id}`}
                >
                  Details
            </Link>
            </div>
            <div className="card-body bg-light p-2">
              <h5><strong>{job.title}</strong></h5>
              <br></br>
              <p>Company: {job.companyName}</p>
              <p>Salary: ${job.minSalary} to ${job.maxSalary}</p>
              <p>{job.description}</p>
              <p>Open Positions: {job.openPositions}</p>

            </div>
            <div className="card-footer">
              <span style={{ fontSize: '1rem' }}>
                Posted on: {job.datePosted}
              </span>
            </div>
          </div>
        ))}
    </div>

    
          
          </div>

    )
}

export default SearchResults;