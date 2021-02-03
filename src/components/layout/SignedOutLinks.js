// import react libraries
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SignedOutLiks() {
  return (
    <ul className='right'>
      <li>
        <NavLink to='/signup'>Signup</NavLink>
      </li>
      <li>
        <NavLink to='/signin'>Sign In</NavLink>
      </li>
    </ul>
  );
}
