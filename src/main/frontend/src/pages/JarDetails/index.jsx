import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import Memory from '../../components/Memory';
import MemoryJarActionBar from '../../components/MemoryJarActionBar';
import IconButton from '../../components/MUI/IconButton';
import StorageIcon from '@mui/icons-material/Storage';

// services
import * as memoryJarService from '../../services/memoryJarService';

const JarDetails = () => {
    const { id } = useParams();
    const [memoryJar, setMemoryJar] = useState();

    const configPopMemoryIconButton = {
        icon: <StorageIcon sx={{ fontSize: 128}}/>
    };

    useEffect(() => {
        const setInitialMemoryIndex = async (jarId) => {
            setMemoryJar(await memoryJarService.getJar(jarId));
        };

        setInitialMemoryIndex(id);
    }, [])

    return (
        <div className='jar-wrapper'>
            <h1>{memoryJar?.data.title}</h1>
            <MemoryJarActionBar jarId={id}/>
            <h2>Favorite {memoryJar?.data.title} Memories</h2>
            <Memory memoryJar={memoryJar} showFavoritesOnly={true} />
            <h2>{memoryJar?.data.title} Memories</h2>
            <Memory memoryJar={memoryJar} />
        </div>
    );
};

export default JarDetails;