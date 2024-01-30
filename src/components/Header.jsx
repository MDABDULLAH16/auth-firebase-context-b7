import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='flex justify-end'>
      <div className='navbar bg-primary text-primary-content'>
        <Link to='/' className='btn btn-ghost text-xl'>
          Auth Master
        </Link>
        <Link to='/' className='btn btn-ghost text-xl'>
          Home
        </Link>
        <Link to='/login' className='btn btn-ghost text-xl'>
          Login
        </Link>
        <Link to='/register' className='btn btn-ghost text-xl'>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Header;
