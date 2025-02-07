import React from 'react';

const TextAreaField = ({label, id, name, value, onChange, className, rows = 4, placeholder, required = false}) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        rows={rows}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default TextAreaField;
