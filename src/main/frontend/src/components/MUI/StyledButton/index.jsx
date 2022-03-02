import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import './index.scss'

const StyledButton = ({ theme, type, variant, label, disabled, handleClick }) => {
    const defaultTheme = createTheme({
        palette: {
            primary: {
                main: '#2196f3'
            },
        }
    })
    
    return (
        <ThemeProvider theme={theme ? theme : defaultTheme}>
            <Button 
                className='Button'
                type={type ? type : 'submit'} 
                variant={variant ? variant : 'contained'} 
                disabled={disabled} 
                onClick={handleClick}
                sx={{
                    width: 196,
                    border: 2,
                    borderRadius: 50,
                    maxWidth: 1024,
                }}
            >
                {label}
            </Button>
        </ThemeProvider>
    );
};

export default StyledButton;