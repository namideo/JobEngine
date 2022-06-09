import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_JOBPOSTINGS } from '../utils/queries';
import { SearchForm } from '../components/SearchForm';
import Card from './Card';


function SearchResults() {

      const { keyword } = useParams();

      const { loading, data } = useQuery(GET_JOBPOSTINGS, {
        variables: { keyword: keyword },
      });
      console.log(data);

      const jobs = data?.jobPostings || [];

      

  // const SearchResults = ({ jobPostings }) => {
  //       if (!jobPostings.length) {
  //         return <h3>No Jobs Found</h3>;
  //       }


    return (

        <div className='Results'>
          Job results

    <div>
      <h3>{}</h3>
      {jobs &&
        jobs.map((job) => (
          <div key={job._id} className="card mb-3">
            <h4 className="card-header bg-primary p-2 m-0">
              {job.title}
            </h4>
            <div className="card-body bg-light p-2">
              <p>Description: {job.description}</p>
              <p>Open Positions: {job.openPositions}</p>
              <p>Skill Set: {job.skillSet}</p>
              <p>Required Experience: {job.workExperience}</p>
              <p>Min Salary: {job.minSalary}</p>
              <p>Max Salary: {job.maxSalary}</p>

            </div>
            <div className="card-footer">
              <span style={{ fontSize: '1rem' }}>
                Job posted at: {job.datePosted}
              </span>
            </div>
          </div>
        ))}
    </div>
          
          </div>

    )
}

export default SearchResults;