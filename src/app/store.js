import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import logger from './middleware';

import authReducer, { authListener } from '../components/auth/authSlice';
import projectReducer, { projectListener } from '../components/projects/projectSlice';
import notificationReducer, {
  notificationListener,
} from '../components/dashboard/notificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    notifications: notificationReducer,
  },
  middleware: [logger, ...getDefaultMiddleware()],
});

authListener(store.dispatch, store.getState);
projectListener(store.dispatch, store.getState);
notificationListener(store.dispatch, store.getState);

export default store;
