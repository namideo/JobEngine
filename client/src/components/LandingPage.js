import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import SearchForm from './SearchForm';

import { GET_JOBPOSTINGS } from '../utils/queries';
import '../styles/CustomStyle.css';
import { Image } from 'semantic-ui-react'

import image from '../images/homepage_6.jpg'

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
        <Image src={image} fluid/>
          <div className='overlay'></div>
          <SearchForm
            value={search}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
    );
}

export default LandingPage;