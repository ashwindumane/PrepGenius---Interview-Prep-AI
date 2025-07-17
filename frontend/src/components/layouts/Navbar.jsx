import React from 'react'; 
import { Link } from 'react-router-dom';
import ProfileInfoCard from '../Cards/ProfileInfoCard';

const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200/50 backdrop-blur flex items-center justify-between px-4">
      <Link to="/dashboard">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          PrepGenius
        </h2>
      </Link>
      <ProfileInfoCard />
    </div>
  );
};

export default Navbar;
