import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_JOBS_POSTED_BY_USER, GET_JOBS_APPLIED_BY_USER } from '../utils/queries';
import { UPDATE_JOB, REMOVE_JOB } from '../utils/mutations';
import { Link } from 'react-router-dom'
import { SearchForm } from '../components/SearchForm';
import Auth from '../utils/auth';
import { useNavigate } from "react-router-dom";


import { Button, Card, Icon } from 'semantic-ui-react';
import { Container, Header } from 'semantic-ui-react';

function Dashboard() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [openPositions, setopenPositions] = useState('');
  const [actJobId, setactJobId] = useState('');

  let isEmployer = Auth.isEmployer();
  let QUERY = isEmployer ? GET_JOBS_POSTED_BY_USER : GET_JOBS_APPLIED_BY_USER;

  const { loading, data } = useQuery(QUERY, {fetchPolicy: "no-cache"} );
  const jobs = isEmployer ? data?.getJobsPostedByUser : data?.getJobsAppliedByUser || [];

  const [updateJob, { errorUpdateJob, updatedJob }] = useMutation(UPDATE_JOB);
  const [removeJob, { errorRemoveJob, removedJob }] = useMutation(REMOVE_JOB);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setopenPositions(value)
  };

  const handleUpdateChange = (jobId) => {
    setactJobId(jobId);
    setEditMode(true);
  };

  const updateJobOpening = async (jobId) => {

    try {
      const { data } = await updateJob({
        variables: { 'jobId': jobId, 'openPositions': parseInt(openPositions) },
      });
      // window.location.reload(true);
      navigate("/");
      // <Redirect to='/dashboard' />
    } catch (err) {
      console.error(err);
    }
  };

  const removeJobPost = async (jobId) => {

    try {
      const { data } = await removeJob({
        variables: { 'jobId': jobId },
      });
      // window.location.assign('/dashboard');
      navigate("/");
      // navigate("/dashboard", { replace: true });
      // <Redirect to='/dashboard' />
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }


  return (

    <Container style={{ margin: 60 }}>
      <Header as='h2' block style={{ backgroundColor: '#CBE6EF', color: '#385E72' }}><p>
        {isEmployer ? (
          <strong>Jobs Posted</strong>
        ) : (
          <strong>Applied Jobs</strong>
        )}
      </p>
      </Header>

      <Card.Group>
        {jobs &&
          jobs.map((job) => (
            <Card key={job._id} >
              <Card.Content>
                <Card.Header>
                  {(isEmployer) ? (
                    <div >
                      {(editMode && actJobId == job._id) ? (
                        <Link
                          className="btn btn-primary btn-block btn-squared"
                          to={``}
                          onClick={() => updateJobOpening(job._id)}
                        >
                          Update
                        </Link>) : (
                        <Link
                          className="btn btn-primary btn-block btn-squared"
                          to={``}
                          onClick={() => {handleUpdateChange(job._id)}}
                        >
                          Update Openings
                        </Link>)}
                      <Link
                        className="btn btn-primary btn-block btn-squared"
                        to={``}
                        onClick={() => removeJobPost(job._id)}
                      >
                        Delete
                      </Link>
                    </div>
                  ) : (
                    <div ></div>
                  )}
                </Card.Header>
                <Card.Description>
                  <h5><strong>{job.title}</strong></h5>
                  {isEmployer ? (
                    <p>Applications Count: {job.applications.length}</p>
                  ) : (
                    <p></p>
                  )}
                  <p>Company: {job.companyName}</p>
                  <p>Salary: ${job.minSalary} to ${job.maxSalary}</p>
                  <p>{job.description}</p>

                  {(editMode && actJobId == job._id) ? (
                    <p>Open Positions: <input type="number" name="openPositions" onChange={handleInputChange} /></p>
                  ) : (
                    <p>Open Positions: {job.openPositions}</p>
                  )}

                  <div className="card-footer">
                    <span style={{ fontSize: '1rem' }}>
                      Posted on: {job.datePosted}
                    </span>
                    <Link
                      className="btn btn-primary btn-block btn-squared"
                      to={`/JobPage/${job._id}`}
                    >
                      Details
                    </Link>
                  </div>
                  {/* </div> */}
                </Card.Description>
              </Card.Content>
             </Card>
          ))}
      </Card.Group>
    </Container>

  )
}

export default Dashboard;