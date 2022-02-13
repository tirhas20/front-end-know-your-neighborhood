import React from 'react';
import './Home.css'
import NeighborhoodImage from './NeighborhoodImage';

const Home = () => {
    return (
        <div>
            <div className='home-page'>
                <h1>Welcome to Know Your Neighborhood</h1>
            </div>
            <div className="neighborhood-image">
                <NeighborhoodImage/>
            </div>
        </div>
        )
};

export default Home;
