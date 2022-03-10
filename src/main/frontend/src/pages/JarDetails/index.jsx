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
    const [memoryJar, setMemoryJar] = useState();
    const [previousRandomMemory, setPreviousRandomMemory] = useState();
    const [currentRandomMemory, setCurrentRandomMemory] = useState();
    const [startFade, setStartFade] = useState(true);

    // let previousRandomMemory;
    // let currentRandomMemory;

    const configPopMemoryIconButton = {
        icon: <StorageIcon sx={{ fontSize: 128}}/>
    };

    const handleClick = async () => {
        setPreviousRandomMemory(currentRandomMemory);
        // console.log('Previous Memory: ', previousRandomMemory);
        setCurrentRandomMemory(await retrieveRandomMemory(memoryJar));
        // console.log('New Memory: ', currentRandomMemory);
        beginFade();
    };

    const endFade = () => {
        setStartFade(false);
    }

    const beginFade = () => {
        setStartFade(true);
    }

    const retrieveRandomMemory = async (jar) => {
        // console.log('Current Memory Jar: ', jar);
        const jarId = jar.data.jarId;
        if (jar.data.memories) {
            // console.log('Array length: ', jar.data.memories.length);
            // console.log('Memories: ', jar.data.memories);
            const randomIndex = getRandomIndexInRange(jar.data.memories.length);
            // console.log('Random index in range: ', randomIndex);
            const memoryFilename = jar.data.memories[randomIndex].filename;
            const memoryTitle = jar.data.memories[randomIndex].title;
            // setRandomMemory({
            //     previousMemory: randomMemory.currentMemory,
            //     currentMemory: <img src={`http://localhost:8080/jars/${jarId}/memories/${memoryFilename}`} alt={memoryTitle} />,
            // });
            const newMemory = <img src={`http://localhost:8080/jars/${jarId}/memories/${memoryFilename}`} alt={memoryTitle} />;
            // console.log('New Memory img: ', newMemory);
            return newMemory;
            // return <img src={`http://localhost:8080/jars/${jarId}/memories/${memoryFilename}`} alt={memoryTitle} />;
        };
    };

    useEffect(() => {
        const setInitialMemoryIndex = async (jarId) => {
            const currentMemoryJar = await memoryJarService.getJar(jarId);
            // console.log('INIT Memory Jar: ', currentMemoryJar);
            setMemoryJar(currentMemoryJar);
            if (currentMemoryJar.data.memories) {
                setCurrentRandomMemory(await retrieveRandomMemory(currentMemoryJar));
                // setRandomMemory({
                //     memoriesLength: currentMemoryJar.data.memories.length
                // });
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
            <Memory currentImg={currentRandomMemory} previousImg={previousRandomMemory} startFade={startFade}/>
            <IconButton {...configPopMemoryIconButton} handleClick={handleClick}/>
            <h2>Open another memory</h2>
        </div>
    );
};

export default JarDetails;