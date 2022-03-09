import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import Memory from '../../components/Memory';
import MemoryJarActionBar from '../../components/MemoryJarActionBar';
import IconButton from '../../components/MUI/IconButton';
import StorageIcon from '@mui/icons-material/Storage';

// services
import * as memoryJarService from '../../services/memoryJarService';

const initialRandomMemory = {
    title: '',
    filename: ''
}

const JarDetails = () => {
    const { id } = useParams();
    // const [memoryJar, setMemoryJar] = useState({});
    const [randomMemory, setRandomMemory] = useState('');

    const configPopMemoryIconButton = {
        icon: <StorageIcon sx={{ fontSize: 128}}/>
    }

    const handleClick = e => {
        console.log('Open another memory');
    }

    useEffect(() => {
        const retrieveRandomMemory = async (jarId) => {
            const currentMemoryJar = await memoryJarService.getJar(jarId);
            if (currentMemoryJar.data.memories) {
                const randomIndex = Math.floor(Math.random() * currentMemoryJar.data.memories.length);
                const memoryFilename = currentMemoryJar.data.memories[randomIndex].filename;
                const memoryTitle = currentMemoryJar.data.title;
                setRandomMemory(
                    memoryJarService.getMemory(id, memoryFilename, memoryTitle)
                );
            }
        }

        retrieveRandomMemory(id);
    }, [])

    return (
        <div className='jar-wrapper'>
            <h1>Memory Jar Title</h1>
            <MemoryJarActionBar jarId={id}/>
            <h2>Favorite Memories</h2>
            <Memory />
            <IconButton {...configPopMemoryIconButton} handleClick={handleClick}/>
            <h2>Open another memory</h2>
            <Memory img={randomMemory}/>
            <IconButton {...configPopMemoryIconButton} handleClick={handleClick}/>
            <h2>Open another memory</h2>
        </div>
    );
};

export default JarDetails;