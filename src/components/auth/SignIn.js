// import react libraries
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// import modules
import { useDispatch, useSelector } from 'react-redux';

// import project files
import { signIn } from './authSlice';

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signIn({ email, password }));

    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [currentUser, history]);

  return (
    <div className='container'>
      <form className='white' onSubmit={handleSubmit}>
        <h5 className='grey-text text-darken-3'>Sign In</h5>
        <div className='input-field'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' onChange={handleChange} value={email} />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={handleChange} value={password} />
        </div>
        <div className='input-field'>
          <button className='btn pink lighten-1 z-depth-0'>Login</button>
          <div className='red-text center'>{authError && <p>{authError.message}</p>}</div>
        </div>
      </form>
    </div>
  );
}
