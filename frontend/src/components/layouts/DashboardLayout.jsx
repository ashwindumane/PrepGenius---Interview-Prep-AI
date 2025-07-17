import React from 'react';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F0F4FF]">
      <Navbar />
      <main className="pt-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
