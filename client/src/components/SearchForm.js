import React from 'react';
import { Link } from 'react-router-dom';

function SearchForm(props) {
  return (
    <div className="content">
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
        {/* <button
          onClick={props.handleFormSubmit}
          className="btn btn-primary"
          type="submit"
        > */}
          {/* Search
        </button> */}
        <Link
              className="btn btn-primary btn-block btn-squared"
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