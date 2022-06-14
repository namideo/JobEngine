import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Container, Header, Grid } from 'semantic-ui-react';

import { useMutation } from '@apollo/client';
import { POST_JOB } from '../utils/mutations';
import { useNavigate } from "react-router-dom";

import '../styles/CustomStyle.css';

import Auth from '../utils/auth';

const JobPostForm = () => {

  const navigate = useNavigate();
  const [jobFormData, setJobFormData] = useState({ companyName: '', title: '', openPositions: '', description: '', minSalary: '', maxSalary: '', skillSet: '', workExperience: '' });

  const [addJobPost, { error, data }] = useMutation(POST_JOB);

  // Capture values of fields when user adds or changes an input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJobFormData({ ...jobFormData, [name]: value });
  };

  // On form submission use mutation to add a new job post
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addJobPost({
        variables: {
          input: { ...jobFormData, ["openPositions"]: parseInt(jobFormData.openPositions), ["minSalary"]: parseInt(jobFormData.minSalary), ["maxSalary"]: parseInt(jobFormData.maxSalary) },
        }
      });
      navigate("/dashboard");

      // window.location.assign('/dashboard');
      // window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
    }

    setJobFormData({
      companyName: '', title: '', openPositions: '', description: '', minSalary: '', maxSalary: '', skillSet: '', workExperience: ''
    });
  };
  return (
    <>
      <Container className='customContainer'>
        <Header as='h3' block style={{ background: '#B7CFDC', color: '#385E72' }}>Please provide job details: </Header>
        <Form noValidate onSubmit={handleFormSubmit}>
          <Grid className='customGrid'>
            <Grid.Row className='customRow'>
              <Grid.Column width={8}>
                <Form.Group>
                  <Form.Label htmlFor='companyName'>Company Name: </Form.Label>
                  <Form.Control
                    type='text'
                    name='companyName'
                    onChange={handleInputChange}
                    value={jobFormData.companyName}
                    required
                  />
                </Form.Group>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Group>
                  <Form.Label htmlFor='title'>Title: </Form.Label>
                  <Form.Control
                    type='text'
                    name='title'
                    onChange={handleInputChange}
                    value={jobFormData.title}
                    required
                  />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='customRow'>
              <Grid.Column width={8}>
                <Form.Group>
                  <Form.Label htmlFor='openPositions'>Openings: </Form.Label>
                  <Form.Control
                    type='text'
                    name='openPositions'
                    onChange={handleInputChange}
                    value={jobFormData.openPositions}
                  />
                </Form.Group>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Group>
                  <Form.Label htmlFor='workExp'>Work Experience: </Form.Label>
                  <Form.Control
                    type='text'
                    name='workExperience'
                    onChange={handleInputChange}
                    value={jobFormData.workExperience}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='customRow'>
              <Grid.Column width={16}>
                <Form.Group>
                  <Form.Label htmlFor='description'>Description: </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name='description'
                    onChange={handleInputChange}
                    value={jobFormData.description}
                    required
                  />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='customRow'>
              <Grid.Column width={8}>
                <Form.Group>
                  <Form.Label htmlFor='minSalary'>Minimum Salary: </Form.Label>
                  <Form.Control
                    type='text'
                    name='minSalary'
                    onChange={handleInputChange}
                    value={jobFormData.minSalary}
                  />
                </Form.Group>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Group>
                  <Form.Label htmlFor='maxSalary'>Maximum Salary: </Form.Label>
                  <Form.Control
                    type='text'
                    name='maxSalary'
                    onChange={handleInputChange}
                    value={jobFormData.maxSalary}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='customRow'>
              <Grid.Column width={16}>
                <Form.Group>
                  <Form.Label htmlFor='skillset'>Skill Set: </Form.Label>
                  <Form.Control
                    type='text'
                    name='skillSet'
                    onChange={handleInputChange}
                    value={jobFormData.skillSet}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>

          </Grid>
          <Button
            type='submit'
            variant='success'>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default JobPostForm;