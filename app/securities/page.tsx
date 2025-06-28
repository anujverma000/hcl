'use client'

import React from 'react';
import UserDashboard from './UserDashboard';
import Holding from './Holding';
import Securities from './Securities';

export default function SecuritiesPage() {

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600">Portfolio Management System</h1>
      <div className='flex gap-4'>
      <Securities />
      <div className='flex-[7]'>
        <UserDashboard/>
        <Holding/>
      </div>
      </div>
    </main>
  );
}
