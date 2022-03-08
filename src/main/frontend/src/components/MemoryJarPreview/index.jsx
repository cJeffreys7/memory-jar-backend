import React from 'react';
import MemoryJarIcon from '../../assets/memoryjar_icon.svg'

const MemoryJarPreview = () => {
    return (
        <div className='memory-jar-wrapper'>
            <img src={MemoryJarIcon} alt="Memory Jar Preview" />
        </div>
    );
};

export default MemoryJarPreview;