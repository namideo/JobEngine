import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_JOBPOSTINGS } from '../utils/queries';
import { Link } from 'react-router-dom'
import { SearchForm } from '../components/SearchForm';

import { Button, Card, Icon } from 'semantic-ui-react';
import { Container, Header } from 'semantic-ui-react';

function SearchResults() {

  const { keyword } = useParams();

  const { loading, data } = useQuery(GET_JOBPOSTINGS, {
    variables: { keyword: keyword },
  });

  const jobs = data?.jobPostings || [];

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <Container style={{ margin: 20 }}>
      <Header as='h3' block style={{ backgroundColor: '#CBE6EF'}}>
        Results
      </Header>
      <Card.Group>
        {jobs &&
          jobs.map((job) => (
            <Card key={job._id}>
              <Card.Content>
                <Card.Header>
                  <h5><strong>{job.title}</strong></h5>
                </Card.Header>
                <Card.Meta>
                  Posted on: {job.datePosted}
                </Card.Meta>
                <Card.Description>
                  <br></br>
                  <p>Company: {job.companyName}</p>
                  <p>Salary: ${job.minSalary} to ${job.maxSalary}</p>
                  <p>{job.description}</p>
                  <p>Open Positions: {job.openPositions}</p>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button animated basic color='blue' primary as={Link} to={`/JobPage/${job._id}`}>
                  <Button.Content visible>Details</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </Container>
  )
}

export default SearchResults;