// import react libraries
import React from 'react';
import { Link } from 'react-router-dom';

// import project files
import ProjectSummary from './ProjectSummary';

export default function ProjectList({ projects }) {
  return (
    <div className='project-list section'>
      {projects &&
        projects.map((project) => (
          <Link to={'/project/' + project.id} key={project.id}>
            <ProjectSummary project={project} />
          </Link>
        ))}
    </div>
  );
}
