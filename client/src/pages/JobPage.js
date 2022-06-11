import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
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
        <div>
      
          {/* <div className="card mb-3"> */}
            {/* <div className="card-header"> */}
            {/* <div>
            <Link
                  className="btn btn-primary btn-block btn-squared"
                  to={``}
                  onClick={() => setShowModal(true)}
                >
                  Apply
            </Link>
            </div> */}
            <div> {/* className="card-body bg-light p-2" */}
              <h5>{job.title}</h5>
              <p>Company: {job.companyName}</p>
              <p>Open Positions: {job.openPositions}</p>
              <p>Description: {job.description}</p>
              <p>Skill Set: {job.skillSet}</p>
              <p>Experience Required: {job.workExperience}</p>
              <p>Salary: ${job.minSalary} to ${job.maxSalary}</p>
              <p>Contact: {job.recruiter.email}</p>
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
                        Can join by :{app.joiningDate}
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

            <div>
              {(!isEmployer)?(<Link
                  className="btn btn-primary btn-block btn-squared"
                  to={``}
                  onClick={() => setShowModal(true)}
                >
                  Apply
            </Link>):(<span></span>)}
            
            </div>
          {/* </div> */}
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
    </div>
    
    )
}

export default JobPage;