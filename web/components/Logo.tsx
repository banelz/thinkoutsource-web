
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: {
      container: 'h-8',
      text: 'text-[10px] tracking-widest px-2',
    },
    md: {
      container: 'h-10',
      text: 'text-xs tracking-[0.15em] px-4',
    },
    lg: {
      container: 'h-14',
      text: 'text-lg tracking-[0.2em] px-8',
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`inline-flex items-stretch border-2 border-black bg-white font-bold uppercase overflow-hidden ${currentSize.container} ${className}`}>
      <div className="bg-black text-white flex items-center justify-center">
        <span className={currentSize.text}>Think</span>
      </div>
      <div className="bg-white text-black flex items-center justify-center">
        <span className={currentSize.text}>Outsource</span>
      </div>
    </div>
  );
};

export default Logo;
