// import react libraries
import React from 'react';
import { NavLink } from 'react-router-dom';

// import modules
import { useDispatch, useSelector } from 'react-redux';

// import project files
import { signOut } from '../auth/authSlice';

export default function SignedInLiks() {
  const dispatch = useDispatch();
  const initials = useSelector((state) => state.auth.currentUser.profile.initials);

  const handleLogOut = () => {
    dispatch(signOut());
  };

  return (
    <ul className='right'>
      <li>
        <NavLink to='/create'>New Project</NavLink>
      </li>
      <li>
        <a href='/' onClick={handleLogOut}>
          Log Out
        </a>
      </li>
      <li>
        <NavLink to='/' className='btn btn-floating pink lighten-1'>
          {initials}
        </NavLink>
      </li>
    </ul>
  );
}
