import React from 'react';
import { TextField } from '@mui/material';

const FormInput = ({ className, name, type, label, placeholder, error, helperText, value, onChange, variant }) => {
    return (
        <div className='input-wrapper'>
            <div className='input-border'>
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
                />
            </div>
        </div>
    );
};

export default FormInput;