import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import Memory from '../../components/Memory';
import MemoryJarActionBar from '../../components/MemoryJarActionBar';
import IconButton from '../../components/MUI/IconButton';
import StorageIcon from '@mui/icons-material/Storage';

// services
import * as memoryJarService from '../../services/memoryJarService';

// const getRandomIndexInRange = (length) => {
//     return Math.floor(Math.random() * length);
// };

const JarDetails = () => {
    const { id } = useParams();
    const [memoryJar, setMemoryJar] = useState();
    // const [previousRandomMemory, setPreviousRandomMemory] = useState();
    // const [currentRandomMemory, setCurrentRandomMemory] = useState();

    const configPopMemoryIconButton = {
        icon: <StorageIcon sx={{ fontSize: 128}}/>
    };

    const handleClick = async () => {

        //* Manual cycle through "random" memories on Click
        // setPreviousRandomMemory(currentRandomMemory);
        // setCurrentRandomMemory(await retrieveRandomMemory(memoryJar));
    };

    //* Set new "random" memory
    // const retrieveRandomMemory = async (jar) => {
    //     const jarId = jar.data.jarId;
    //     if (jar.data.memories) {
    //         const randomIndex = getRandomIndexInRange(jar.data.memories.length);
    //         const memoryFilename = jar.data.memories[randomIndex].filename;
    //         const memoryTitle = jar.data.memories[randomIndex].title;
    //         const newMemory = <img src={`http://localhost:8080/jars/${jarId}/memories/${memoryFilename}`} alt={memoryTitle} />;
    //         return newMemory;
    //     };
    // };

    useEffect(() => {
        const setInitialMemoryIndex = async (jarId) => {
            setMemoryJar(await memoryJarService.getJar(jarId));

            //* Set random Memory
            // const currentMemoryJar = await memoryJarService.getJar(jarId);
            // setMemoryJar(currentMemoryJar);
            // if (currentMemoryJar.data.memories) {
            //     setCurrentRandomMemory(await retrieveRandomMemory(currentMemoryJar));
            // };
        };

        setInitialMemoryIndex(id);
    }, [])

    return (
        <div className='jar-wrapper'>
            <h1>{memoryJar.data.title}</h1>
            <MemoryJarActionBar jarId={id}/>
            <h2>Favorite {memoryJar.data.title} Memories</h2>
            <Memory />
            {/* <IconButton {...configPopMemoryIconButton} handleClick={handleClick}/>
            <h2>Open another memory</h2> */}
            {/* <Memory currentImg={currentRandomMemory} previousImg={previousRandomMemory} /> */}
            <h2>{memoryJar.data.title} Memories</h2>
            <Memory memoryJar={memoryJar} />
            {/* <IconButton {...configPopMemoryIconButton} handleClick={handleClick}/>
            <h2>Open another memory</h2> */}
        </div>
    );
};

export default JarDetails;