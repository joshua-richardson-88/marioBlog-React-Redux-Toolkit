// import react libraries
import React from 'react';

// import modules
import { useSelector } from 'react-redux';

// import modules
import moment from 'moment';

export default function ProjectDetails(props) {
  const id = props.match.params.id;
  const projects = useSelector((state) => state.project.data);
  const project = projects.filter((project) => project.id === id)[0];

  if (project) {
    return (
      <div className='container section project-details'>
        <div className='card z-depth-0'>
          <div className='card-content'>
            <span className='card-title'>{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className='card-action grey lighten-4 grey-text'>
            <div>
              Posted By {project.authorFirstName} {project.authorLastName}
            </div>
            <div>{moment(new Date(project.createdAt)).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='container center'>
        <p>Loading project...</p>
      </div>
    );
  }
}
