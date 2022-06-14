import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_JOBPOSTINGS } from '../utils/queries';
import { Link } from 'react-router-dom'
import { SearchForm } from '../components/SearchForm';
import Auth from '../utils/auth';

import { Button, Card, Icon } from 'semantic-ui-react';
import { Container, Header } from 'semantic-ui-react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

function SearchResults() {

  const { keyword } = useParams();

  const { loading, data } = useQuery(GET_JOBPOSTINGS, {
    variables: { keyword: keyword },
  });

  const jobs = data?.jobPostings || [];

  if (loading) {
    return <Header as='h1'> LOADING...</Header>;
    
  }

  return (
    <Container style={{ margin: 20 }}>
      <Header as='h2' block style={{ background: '#B7CFDC', color: '#385E72'}}>
        Results
      </Header>
      <Card.Group>
        {jobs &&
          jobs.map((job) => (
            <Card className='customCard' key={job._id} style={{ width: '32%'}} color='blue'>
              <Card.Content>
                <Card.Header>
                  <h3><strong>{job.title}</strong></h3>
                </Card.Header>
                <Card.Meta>
                  Posted on: {job.datePosted}
                </Card.Meta>
                <Card.Description style={{fontSize: '1rem'}}>
                  <br></br>
                  <p><strong>Company: </strong> {job.companyName}</p>
                  <p><strong>Salary: </strong>${job.minSalary} to ${job.maxSalary}</p>
                  <p><strong>Description: </strong>{job.description}</p>
                  <p><strong>Open Positions: </strong>{job.openPositions}</p>
                </Card.Description>
              </Card.Content>
              {(Auth.loggedIn())?(
              <Card.Content extra>
                {/* basic color='#B5B2B0' */}
                <Button animated style={{ background: '#385E72', color: 'white'}} primary as={Link} to={`/JobPage/${job._id}`}>
                  <Button.Content visible>Details</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>
              </Card.Content>
              ):null}
            </Card>
          ))}
      </Card.Group>
    </Container>
  )
}

export default SearchResults;