import React from 'react';
import Memory from '../../components/Memory';

const Home = () => {
    return (
        <div>
            <h2>Favorite Memories</h2>
            <Memory />
            <h2>Recent Memories</h2>
            <Memory />
        </div>
    );
};

export default Home;