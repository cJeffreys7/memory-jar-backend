import React from 'react';
import Button from '@mui/material/Button';

const StyledButton = ({ type, variant, label, disabled, handleClick }) => {
    return (
        <Button type={type ? type : 'submit'} variant={variant ? variant : 'contained'} disabled={disabled} onClick={handleClick}>
            {label}
        </Button>
    );
};

export default StyledButton;