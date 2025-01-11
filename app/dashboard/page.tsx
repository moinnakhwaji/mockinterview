"use client";
import AddNewInterview from '@/components/shared/Addnewinterview';
import PreviousMock from '@/components/shared/Periviousmock';
import React from 'react';

const Dashboard = () => {
  return (
    <div className="px-12 py-8 bg-[#1f1e24] h-screen w-full text-white">
      <h1 className="capitalize font-extrabold text-3xl mb-4">Dashboard</h1>
      <p className="text-sm text-[#d1d1d1] mb-8">Create and Start your Mock Interview</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AddNewInterview />
      </div>

      <div className='mt-8'>
        <PreviousMock />
      </div>
    </div>
  );
};

export default Dashboard;
