import React from 'react';
import Link from 'next/link';

const Button = ({text, href, onClick, onSubmit, type = 'button', className}) => {
  return href ? (
    <Link href={href} className='w-full'>
      <button type={type} className={className}>
        {text}
      </button>
    </Link>
  ) : (
    <button type={type} onClick={onClick} onSubmit={onSubmit} className={className}>
      {text}
    </button>
  );
};

export default Button;
