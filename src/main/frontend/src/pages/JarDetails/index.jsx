import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentMemoryJar } from '../../redux/MemoryJar/memoryJarActions';

// components
import Memory from '../../components/Memory';
import MemoryJarActionBar from '../../components/MemoryJarActionBar';
import IconButton from '../../components/MUI/IconButton';
import StorageIcon from '@mui/icons-material/Storage';

// services
import * as memoryJarService from '../../services/memoryJarService';

const JarDetails = (props) => {
    const { id } = useParams();
    const { currentMemoryJar, setCurrentMemoryJar } = props;

    const configPopMemoryIconButton = {
        icon: <StorageIcon sx={{ fontSize: 128}}/>
    };

    useEffect(() => {
        const getMemoryJar = async (jarId) => {
            const newMemoryJar = await memoryJarService.getJar(jarId);
            console.log('New Memory Jar data: ', newMemoryJar);
            setCurrentMemoryJar(newMemoryJar.data);
        };

        getMemoryJar(id);
    }, [])

    return (
        <div className='jar-wrapper'>
            <h1>{currentMemoryJar?.title}</h1>
            <MemoryJarActionBar jarId={id}/>
            <h2>Favorite {currentMemoryJar?.title} Memories</h2>
            <Memory showFavoritesOnly={true} />
            <h2>{currentMemoryJar?.title} Memories</h2>
            <Memory />
        </div>
    );
};

const mapStateToProps = ({ memoryJar }) => ({
    currentMemoryJar: memoryJar.currentMemoryJar
});

const mapDispatchToProps = dispatch => ({
    setCurrentMemoryJar: memoryJar => dispatch(setCurrentMemoryJar(memoryJar))
});

export default connect(mapStateToProps, mapDispatchToProps)(JarDetails);