import React from 'react';
import { NavLink } from 'react-router-dom';

const DrawerDashboard = ({ currentUser, onClose, isDrawerOpen }) => {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-4 ${isDrawerOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button className="text-white focus:outline-none" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      {currentUser && (
        <div>
          <p className="text-lg font-semibold">Welcome, {currentUser.name}</p>
          <nav className="mt-4">
            {currentUser.role === 'user' && (
              <>
                <NavLink to="/transactions" className="block py-2 hover:bg-gray-800">Transactions</NavLink>
                <NavLink to="/profile" className="block py-2 hover:bg-gray-800">Profile Settings</NavLink>
              </>
            )}
            {currentUser.role === 'agent' && (
              <>
                <NavLink to="/transactions" className="block py-2 hover:bg-gray-800">Agent Transactions</NavLink>
                <NavLink to="/profile" className="block py-2 hover:bg-gray-800">Agent Profile</NavLink>
              </>
            )}
            {currentUser.role === 'admin' && (
              <>
                <NavLink to="/transactions" className="block py-2 hover:bg-gray-800">Admin Transactions</NavLink>
                <NavLink to="/users" className="block py-2 hover:bg-gray-800">Manage Users</NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default DrawerDashboard;
