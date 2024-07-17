import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Provider/AuthProvider';
import DrawerDashboard from '../DrawerDashboard/DrawerDashboard';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="navbar bg-blue-950 text-white">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={toggleDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Taka</a>
      </div>

      <div className="flex-none">
        {currentUser ? (
          <>
            <p>{currentUser.email}</p>
            <button className="btn btn-outline border-0 border-b-4 border-t-2 border-white text-[14px] md:text-[18px] text-white px-2 font-bold" onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <NavLink to='/login'>
            <button className="btn btn-outline border-0 border-b-4 border-t-2 border-white text-white px-3 text-xl font-bold">Sign In</button>
          </NavLink>
        )}
      </div>

     
      <DrawerDashboard currentUser={currentUser} onClose={toggleDrawer} isDrawerOpen={isDrawerOpen} />
    </div>
  );
};

export default Navbar;
