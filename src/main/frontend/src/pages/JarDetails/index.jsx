import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import Memory from '../../components/Memory';
import MemoryJarActionBar from '../../components/MemoryJarActionBar';
import IconButton from '../../components/MUI/IconButton';
import StorageIcon from '@mui/icons-material/Storage';

// services
import * as memoryJarService from '../../services/memoryJarService';

const getRandomIndexInRange = (length) => {
    return Math.floor(Math.random() * length);
};

const JarDetails = () => {
    const { id } = useParams();
    const [newRandomMemory, setNewRandomMemory] = useState({});
    const [memoryJar, setMemoryJar] = useState();
    const [randomMemory, setRandomMemory] = useState();

    const configPopMemoryIconButton = {
        icon: <StorageIcon sx={{ fontSize: 128}}/>
    };

    const handleClick = () => {
        retrieveRandomMemory(id);
    };

    const retrieveRandomMemory = async (jarId) => {
        console.log('Current Memory Jar: ', memoryJar);
        if (memoryJar.data.memories) {
            const memoryFilename = memoryJar.data.memories[getRandomIndexInRange(newRandomMemory.memoriesLength)].filename;
            const memoryTitle = memoryJar.data.title;
            setRandomMemory(
                <img src={`http://localhost:8080/jars/${jarId}/memories/${memoryFilename}`} alt={memoryTitle} />
            );
        };
    };

    useEffect(() => {
        const setInitialMemoryIndex = async (jarId) => {
            const currentMemoryJar = await memoryJarService.getJar(jarId);
            setMemoryJar(currentMemoryJar);
            if (currentMemoryJar.data.memories) {
                setNewRandomMemory({
                    memoriesLength: currentMemoryJar.data.memories.length,
                });
                retrieveRandomMemory(jarId);
            };
        };

        setInitialMemoryIndex(id);
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