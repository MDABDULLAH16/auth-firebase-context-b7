import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Header = () => {
  const { user, userSignOut } = useContext(AuthContext);

  const handleSignOut = () => {
    userSignOut();
  };
  return (
    <div className='flex justify-end'>
      <div className='navbar bg-primary text-primary-content'>
        <Link to='/' className='btn btn-ghost text-xl'>
          Auth Master
        </Link>
        <Link to='/' className='btn btn-ghost text-xl'>
          Home
        </Link>

        <Link to='/register' className='btn btn-ghost text-xl'>
          Register
        </Link>

        {user ? (
          <div>
            {user.email}
            <button
              onClick={handleSignOut}
              className='btn btn-outline btn-accent'
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to='/login' className='btn btn-ghost text-xl'>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
