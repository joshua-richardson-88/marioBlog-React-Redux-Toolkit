// import react libraries
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// import modules
import { useSelector } from 'react-redux';

// import project files

export default function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to='/signin' />;
      }}
    ></Route>
  );
}
