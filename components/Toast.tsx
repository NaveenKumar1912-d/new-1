import React, { useEffect, useState } from 'react';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
  onClose: (id: string) => void;
  duration?: number; // Duration in milliseconds before auto-closing
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show toast with a slight delay for animation
    const showTimer = setTimeout(() => setIsVisible(true), 50);

    // Auto-close after duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      // Allow fade-out animation before actual removal
      setTimeout(() => onClose(id), 300); 
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [id, duration, onClose]);

  const bgColor = {
    success: 'bg-green-500',
    info: 'bg-blue-500',
    error: 'bg-red-500',
  }[type];

  const icon = {
    success: '✅',
    info: 'ℹ️',
    error: '❌',
  }[type];

  return (
    <div
      className={`relative flex items-center gap-3 p-4 pr-10 rounded-lg shadow-lg text-white transition-all duration-300 ${bgColor}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      role="alert"
    >
      <span className="text-xl">{icon}</span>
      <span>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300); // Wait for fade-out
        }}
        className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors p-1"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
