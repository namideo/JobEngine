import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Navbar, Nav, Modal, Tab } from 'react-bootstrap';
import { Container, Grid } from 'semantic-ui-react'
import { GET_JOB_ID } from '../utils/queries';
import { Link } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import Auth from '../utils/auth';


const JobPage = () => {

  const isEmployer = Auth.isEmployer();

  const [showModal, setShowModal] = useState(false);
    const { jobId } = useParams();
    const [jobID, setJobId] = useState(jobId);

    const { loading, data } = useQuery(GET_JOB_ID, {
      variables: { jobId: jobId }, 
    });
  
    const job = data?.jobPosting || {};

    if (loading) {
      return <h2>LOADING...</h2>;
    }

    return (
        <div class='jobPage'>

          <Container>
            <Grid divided='vertically'>

        <Grid.Row centered columns> 
          <Grid.Column width={11}><h1>{job.title}</h1></Grid.Column>
          </Grid.Row>
            <Grid.Row centered columns={2}>
              <Grid.Column width={6}>
              <div> 
                  <p><strong>Company:</strong> {job.companyName}</p>
                  <p><strong>Open Positions:</strong> {job.openPositions}</p>
                  <p><strong>Desired Skills:</strong> {job.skillSet}</p>
                  <p><strong>Experience Required:</strong> {job.workExperience}</p>
                  <p><strong>Salary:</strong> ${job.minSalary} to ${job.maxSalary}</p>
                </div>
              </Grid.Column>

              <Grid.Column width={5}>
                  <p>{job.description}</p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row centered columns={2}>
              <Grid.Column width={6}>
                  <h3><strong>Contact Recruiter: </strong></h3><p>{job.recruiter.email}</p>
              </Grid.Column>

            <Grid.Column width={5}>
              <div>
              {(!isEmployer)?(<Link
                  className="btn btn-primary btn-block btn-squared"
                  to={``}
                  onClick={() => setShowModal(true)}
                >
                  Apply
            </Link>):(<span></span>)}
            
            </div>
            </Grid.Column>
            </Grid.Row>
            </Grid>

          <div className="applicants">

          
              {(job.applications && isEmployer && job.recruiter._id == Auth.getUserInfo()._id)?(
                job.applications.map((app) => (
                    
                    <div key={app._id} className="card mb-5">
                    
                        <div className="card-header">
                        <h5><strong>{app.applicant.username}</strong></h5>
                        </div>
                        <div className="card-body bg-light p-2">
                          <p>Contact Info: {app.contactInfo}</p>
                          <p>Notes: {app.notes}</p>
                        </div>
                        <div className="card-footer">
                          <span style={{ fontSize: '1rem' }}>
                          {/* Can join by :{(app.joiningDate)} */}
                          Can join by : {new Intl.DateTimeFormat('en-US').format(app.joiningDate)}
                          </span>
                        </div>
                    </div>
                  ))
              ):(<span></span>)}
            </div>
            <div className="card-footer">
              <span style={{ fontSize: '1rem' }}>
                Posted on: {job.datePosted}
              </span>
            </div>

            

          <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='application-modal'>
        {/* tab container to do either signup or login component */}
          <Modal.Header closeButton>
            <Modal.Title id='application-modal'>
            <h5>Please provide following details: </h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
                <ApplicationForm handleModalClose={() => setShowModal(false)} jobId= { jobId } />
            </Tab.Content>
          </Modal.Body>
      </Modal>
      
    </Container>
    </div>
    
    )
}

export default JobPage;