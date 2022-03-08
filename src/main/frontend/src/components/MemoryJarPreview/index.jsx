import React from 'react';
import { Link } from 'react-router-dom';

// assets
import MemoryJarIcon from '../../assets/memoryjar_icon.svg'

const MemoryJarPreview = ({ jarId }) => {
    return (
        <div className='memory-jar-wrapper'>
            <Link to={`/jars/${jarId}`}>
                <img src={MemoryJarIcon} alt="Memory Jar Preview" />
            </Link>
        </div>
    );
};

export default MemoryJarPreview;