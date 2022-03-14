import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { clearCurrentMemoryJar } from '../../redux/MemoryJar/memoryJarActions';

// components
import Memory from '../../components/Memory';
import MemoryJarPreview from '../../components/MemoryJarPreview';

// services
import * as memoryJarService from '../../services/memoryJarService';

import './styles.scss'

const Home = (props) => {
    const { currentUser, currentMemoryJar, clearCurrentMemoryJar } = props;
    const [memoryJars, setMemoryJars] = useState([]);

    useEffect(() => {
        const getMemoryJars = async () => {
            const ownerJars = await memoryJarService.getJarsByViewer(currentUser.id);
            setMemoryJars(ownerJars.data);
        };

        if (currentMemoryJar) {
            clearCurrentMemoryJar();
        }
        getMemoryJars();
    }, [currentUser.id])

    return (
        <div className='home-wrapper'>
            <h2>Favorite Memories</h2>
            <Memory showFavoritesOnly={true} />
            <h2>Recent Memories</h2>
            <Memory />
            <div className='memory-jar-previews'>
                {memoryJars?.map(jar => <MemoryJarPreview key={jar.jarId} jarId={jar.jarId}/>)}
            </div>
        </div>
    );
};

Home.defaultProps = {
    currentUser: null
}

const mapStateToProps = ({ user, memoryJar }) => ({
    currentUser: user.currentUser,
    currentMemoryJar: memoryJar.currentMemoryJar
});

const mapDispatchToProps = dispatch => ({
    clearCurrentMemoryJar: memoryJar => dispatch(clearCurrentMemoryJar(memoryJar))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);