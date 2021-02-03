// import react libraries
import React from 'react';
import { Link } from 'react-router-dom';

// import modules
import { useSelector } from 'react-redux';

// import project files
import SignedInLiks from './SignedInLiks';
import SignedOutLiks from './SignedOutLinks';

export default function Navbar() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoaded = useSelector((state) => state.auth.isLoaded);
  const links =
    isLoaded && currentUser ? (
      <SignedInLiks />
    ) : isLoaded && !currentUser ? (
      <SignedOutLiks />
    ) : null;

  return (
    <nav className='nav-wrapper grey darken-3'>
      <div className='container'>
        <Link to='/' className='brand-logo'>
          MarioPlan
        </Link>
        {links}
      </div>
    </nav>
  );
}
