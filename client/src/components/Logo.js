import React from 'react';

function Logo(props) {
  return (
    <img
      width={60}
      height={43}
      alt="Logo"
      src="/static/payment-logo.png"
      {...props}
    />
  );
}

export default Logo;
