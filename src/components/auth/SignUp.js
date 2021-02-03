// import react libraries
import React, { useState } from 'react';

// import modules
import { useDispatch, useSelector } from 'react-redux';

// import project files
import { signUp } from '../../components/auth/authSlice';

export default function SignUp() {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp({ email, password, firstName, lastName }));

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div className='container'>
      <form className='white' onSubmit={handleSubmit}>
        <h5 className='grey-text text-darken-3'>Sign Up</h5>
        <div className='input-field'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' onChange={handleChange} value={email} />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={handleChange} value={password} />
        </div>
        <div className='input-field'>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' onChange={handleChange} value={firstName} />
        </div>
        <div className='input-field'>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' onChange={handleChange} value={lastName} />
        </div>
        <div className='input-field'>
          <button className='btn pink lighten-1 z-depth-0'>Sign Up</button>
          <div className='red-text center'>{authError && <p>{authError}</p>}</div>
        </div>
      </form>
    </div>
  );
}
