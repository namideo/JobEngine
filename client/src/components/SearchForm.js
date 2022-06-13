import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react'
import '../styles/CustomStyle.css';

function SearchForm(props) {
  return (
    <div className="custom-content">
      <Header as='h1'>Jobverse</Header>
      <Header as='h2'>Find your next job here!</Header>
    <form>
      <div className="search-form">
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className="form-field"
          placeholder="Job title or keyword"
          id="search"
        />

        <Link
              className="btn btn-primary btn-block btn-squared custombtn"
              to={`/searchResults/${props.value}`}
            >
              Search Jobs
            </Link>
      </div>
    </form>
    </div>
  );
}

export default SearchForm;