
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-[50vh] min-h-[350px] text-white flex items-center justify-center text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-16265557999124-765373a4f890?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 p-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Discover Recipes From What You Already Have 🍲
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Let AI suggest the perfect Tamil Nadu style recipe from your kitchen ingredients.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
