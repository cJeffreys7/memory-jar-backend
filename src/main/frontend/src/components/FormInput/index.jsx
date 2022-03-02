import React from 'react';
import { TextField } from '@mui/material';

const FormInput = ({ className, name, type, label, placeholder, error, helperText, value, onChange, variant }) => {
    return (
        <TextField
            className={className}
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            value={value}
            onChange={onChange}
            variant={variant}
            sx = {{
                maxWidth: 1024,
            }}
        />
    );
};

export default FormInput;