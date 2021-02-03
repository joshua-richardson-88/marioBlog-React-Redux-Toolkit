// import react libraries
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// import modules
import { useDispatch, useSelector } from 'react-redux';

// import project files
import { createProject } from './projectSlice';

const CreateProject = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.project.error);
  const loadingFlag = useSelector((state) => state.project.loading);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [catchFlag, setCatchFlag] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'content':
        setContent(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createProject({ title, content, currentUser }));
  };

  useEffect(() => {
    if (loadingFlag) setCatchFlag(true);
    if (catchFlag && !errorMessage) history.push('/');
  }, [catchFlag, errorMessage, history, loadingFlag]);

  return (
    <div className='container'>
      <form className='white' onSubmit={handleSubmit}>
        <h5 className='grey-text text-darken-3'>Create New Project</h5>
        <div className='input-field'>
          <label htmlFor='email'>Title</label>
          <input type='text' id='title' onChange={handleChange} value={title} />
        </div>
        <div className='input-field'>
          <label htmlFor='content'>Project Content</label>
          <textarea
            id='content'
            className='materailize-textarea'
            onChange={handleChange}
            value={content}
          />
        </div>
        {errorMessage && <div className='error'>{errorMessage}</div>}
        <div className='input-field'>
          <button className='btn pink lighten-1 z-depth-0'>Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
