import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import IconButton from '../MUI/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import Style from './styles.scss'

const MemoryJarActionBar = ({ jarId }) => {
    const navigate = useNavigate();
    const iconSize = Style.fontSize;

    const configEditIconButton = {
        icon: <EditIcon sx={{ fontSize: iconSize}}/>
    }

    const configShareIconButton = {
        icon: <ShareIcon sx={{ fontSize: iconSize}}/>
    }

    const configAddIconButton = {
        icon: <AddIcon sx={{ fontSize: iconSize}}/>
    }

    const configDeleteIconButton = {
        icon: <DeleteIcon sx={{ fontSize: iconSize}}/>
    }

    const editMemoryJar = e => {
        console.log('Edit Memory Jar action pressed');
    };

    const shareMemoryJar = e => {
        console.log('Share Memory Jar action pressed');
    };

    const addMemoryJar = e => {
        console.log('Add Memory Jar action pressed');
        navigate(`/jars/${jarId}/memories/new`)
    };

    const deleteMemoryJar = e => {
        console.log('Delete Memory Jar action pressed');
    };

    return (
        <div className='action-bar'>
            <IconButton {...configEditIconButton} handleClick={editMemoryJar}/>
            <IconButton {...configShareIconButton} handleClick={shareMemoryJar}/>
            <IconButton {...configAddIconButton} handleClick={addMemoryJar}/>
            <IconButton {...configDeleteIconButton} handleClick={deleteMemoryJar}/>
        </div>
    );
};

export default MemoryJarActionBar;