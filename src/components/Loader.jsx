import React from 'react';
import Logo from '../assets/Logo.gif';
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
<div className="w-52 h-52 rounded-full overflow-hidden">
  <img 
    src={Logo} 
    alt="Loading..."
    className="w-auto h-full object-cover" 
  />
</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;