import React from 'react';
import { useParams } from 'react-router-dom';

// components
import Memory from '../../components/Memory';
import MemoryJarActionBar from '../../components/MemoryJarActionBar';
import IconButton from '../../components/MUI/IconButton';
import StorageIcon from '@mui/icons-material/Storage';

const JarDetails = () => {
    const { id } = useParams();

    const configPopMemoryIconButton = {
        icon: <StorageIcon sx={{ fontSize: 128}}/>
    }

    const handleClick = e => {
        console.log('Open another memory');
    }

    return (
        <div className='jar-wrapper'>
            <h1>Memory Jar Title</h1>
            <MemoryJarActionBar jarId={id}/>
            <h2>Favorite Memories</h2>
            <Memory />
            <IconButton {...configPopMemoryIconButton} handleClick={handleClick}/>
            <h2>Open another memory</h2>
            <Memory />
            <IconButton {...configPopMemoryIconButton} handleClick={handleClick}/>
            <h2>Open another memory</h2>
        </div>
    );
};

export default JarDetails;