import React from 'react';

const FormInput = ({ className, name, type, placeholder, value, onChange }) => {
    return (
        <div className='input-wrapper'>
            <div className='input-border'>
                <input
                    className={className}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default FormInput;