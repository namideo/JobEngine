import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Navbar, Nav, Modal, Tab } from 'react-bootstrap';
import { Container, Header, Grid, Image } from 'semantic-ui-react'
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
      
        <div className='jobPage'>
          
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

              {/* <Grid.Column>
                <div>
                  <span style={{ fontSize: '1rem' }}>
                    Posted on: {job.datePosted}
                  </span>
                </div>
              </Grid.Column> */}

              <Grid.Column width={5}>
              <div>
                <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={``}
                    onClick={() => setShowModal(true)}
                    >
                    Apply
                </Link>
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
              </Grid.Column>
          </Grid.Row>
      </Grid>
            </Container>
            </div>

            
    
    )
}

export default JobPage;