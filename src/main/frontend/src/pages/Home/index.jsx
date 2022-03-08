import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// components
import Memory from '../../components/Memory';

import './index.scss'
import MemoryJarPreview from '../../components/MemoryJarPreview';

const Home = (props) => {
    const { currentUser } = props
    const [memoryJars, setMemoryJars] = useState([])

    useEffect(() => {
        const getMemoryJars = () => {
            axios.get(
                `http://localhost:8080/jars/${currentUser.id}`,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            ).then((result) => {
                console.log('Returned Jars: ', result);
                setMemoryJars(
                    result.data.map(jar => <MemoryJarPreview key={jar.jarId} jarId={jar.jarId}/>)
                )
            }).catch((err) => {
                console.log('Failed to return Jars: ', err);
            })
        };

        getMemoryJars();
    }, [])

    return (
        <div className='wrapper'>
            <h2>Favorite Memories</h2>
            <Memory />
            <h2>Recent Memories</h2>
            <Memory />
            <div className='memory-jar-previews'>
                {memoryJars && memoryJars}
            </div>
        </div>
    );
};

Home.defaultProps = {
    currentUser: null
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(Home);