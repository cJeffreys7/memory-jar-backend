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
    const { currentUser, currentMemoryJar, setCurrentMemoryJar } = props;
    const [memoryJars, setMemoryJars] = useState([]);
    const [recentMemories, setRecentMemories] = useState([]);
    const [favoriteMemories, setFavoriteMemories] = useState([]);

    const getRecentMemories = async () => {

    }

    useEffect(() => {
        const getMemories = async () => {
            const ownerJars = await memoryJarService.getJarsByViewer(currentUser.id);
            let newestMemories = [];
            let favoritedMemories = [];
            for (const jar of ownerJars.data) {
                if (jar.memories?.length) {
                    let mappedMemories = memoryJarService.mapMemories(jar.jarId, jar.memories);
                    // Clone mappedMemories instead of shallow copy so all memories are iterated through
                    const totalMemories = mappedMemories.map(memory => memory);
                    totalMemories.forEach(memory => {
                        if (memory.isFavorited) {
                            const memoryIndex = mappedMemories.indexOf(memory);
                            favoritedMemories.push(mappedMemories.splice(memoryIndex, 1)[0]);
                        };
                    });
                    const updatedMemories = newestMemories.concat(mappedMemories);
                    newestMemories = updatedMemories;
                };
            };
            setRecentMemories(newestMemories);
            setFavoriteMemories(favoritedMemories);
            setMemoryJars(ownerJars.data);
        };

        getMemories();
        if (currentMemoryJar) {
            clearCurrentMemoryJar();
        };
    }, [currentUser.id])

    return (
        <div className='home-wrapper'>
            <h2>Favorite Memories</h2>
            <Memory showFavoritesOnly={true} favoriteMemories={favoriteMemories} />
            <h2>Recent Memories</h2>
            <Memory recentMemories={recentMemories} />
            <div className='memory-jar-previews'>
                {memoryJars?.map(jar => <MemoryJarPreview key={jar.jarId} jarId={jar.jarId}/>)}
            </div>
        </div>
    );
};

Home.defaultProps = {
    currentUser: null,
    currentMemoryJar: null
}

const mapStateToProps = ({ user, memoryJar }) => ({
    currentUser: user.currentUser,
    currentMemoryJar: memoryJar.currentMemoryJar
});

const mapDispatchToProps = dispatch => ({
    clearCurrentMemoryJar: memoryJar => dispatch(clearCurrentMemoryJar(memoryJar))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);