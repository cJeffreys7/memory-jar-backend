import React from 'react';
import Memory from '../../components/Memory';

// services
import * as authService from '../../services/authService'

const Home = ({ handleLogout }) => {
    return (
        <div>
            <h2>Favorite Memories</h2>
            <Memory />
            <h2>Recent Memories</h2>
            <Memory />
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default Home;