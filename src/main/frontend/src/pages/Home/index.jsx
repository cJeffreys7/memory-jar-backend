import React from 'react';
import Memory from '../../components/Memory';

import './index.scss'

const Home = (props) => {
    return (
        <div className='wrapper'>
            <h2>Favorite Memories</h2>
            <Memory />
            <h2>Recent Memories</h2>
            <Memory />
        </div>
    );
};

export default Home;