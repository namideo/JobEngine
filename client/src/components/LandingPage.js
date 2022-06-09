import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import SearchForm from './SearchForm';

import { GET_JOBPOSTINGS } from '../utils/queries';

import Hero from '../images/hero.jpeg'
import image from '../images/Image2.jpeg'

const LandingPage = () => {
  

    const [result, setResult] = useState({});
    const [search, setSearch] = useState('');

    const searchJobs = () => {
      // const { loading, data } = useQuery(GET_JOBPOSTINGS);
      // const jobs = data?.jobs || [];
    
    }
    
     useEffect(() => {       
        searchJobs('');
     }, []);

    const handleInputChange = (e) => setSearch(e.target.value);
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      searchJobs(search);
    };

    
    return (
        <div> 
        <img className="hero" src={image} alt="hero"></img>
        <SearchForm
              value={search}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
            />
        </div>
    );
}

export default LandingPage;