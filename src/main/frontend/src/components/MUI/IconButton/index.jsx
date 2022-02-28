import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';

function IconButton({ theme, color, icon }) {
    const [pressed, setPressed] = useState(false);

    const handleClick = () => {
        setPressed(!pressed);
    }

    return (
        <ThemeProvider theme={theme}>
            <Button
                color={color ? color : pressed ? "primary" : "secondary"}
                onClick={handleClick}
            >
                {icon && icon}
            </Button>
        </ThemeProvider>
    );
}

export default IconButton;