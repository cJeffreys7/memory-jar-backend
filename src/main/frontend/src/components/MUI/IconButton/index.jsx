import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

function IconButton({ theme, color, icon, handleClick }) {
    const [pressed, setPressed] = useState(false);

    const onClick = () => {
        setPressed(!pressed);
        if (handleClick) handleClick();
    }

    const defaultTheme = createTheme({
        palette: {
            primary: {
                main: '#000000'
            },
            secondary: {
                main: '#000000'
            }
        }
    })

    return (
        <ThemeProvider theme={theme ? theme : defaultTheme}>
            <Button
                color={color ? color : pressed ? "primary" : "secondary"}
                onClick={onClick}
            >
                {icon && icon}
            </Button>
        </ThemeProvider>
    );
}

export default IconButton;