// import react libraries
import React from 'react';

// import modules
import { useSelector } from 'react-redux';

// import project files
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';

export default function Dashboard() {
  const projects = useSelector((state) => state.project.data);

  return (
    <div className='dashboard container'>
      <div className='row'>
        <div className='col s12 m6'>
          <ProjectList projects={projects} />
        </div>
        <div className='col s12 m5 offset-m1'>
          <Notifications />
        </div>
      </div>
    </div>
  );
}
