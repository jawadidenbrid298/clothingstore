import React from 'react';

const InputField = ({label, id, name, options, value, onChange, className, type = 'text', placeholder, required = false}) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;
