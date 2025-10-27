import React from 'react';
import Logo from '../assets/Logo.gif';
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
     <img 
  src={Logo} 
  alt="Loading..."
  className="mx-auto w-auto h-52 pb-5 object-top" 
/>
      </div>
    </div>
  );
};

export default LoadingSpinner;