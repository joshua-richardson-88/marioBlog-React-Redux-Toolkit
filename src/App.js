// import react
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import modules

// import project files
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import PrivateRoute from './components/auth/PrivateRoute';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/project/:id' component={ProjectDetails} />
          <PrivateRoute exact path='/create' component={CreateProject} />
        </Switch>
      </div>
    </Router>
  );
}
