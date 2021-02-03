import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../config/firebaseConfig';

export const notificationListener = (dispatch, getState) => {
  db.collection('notifications')
    .orderBy('time', 'asc')
    .limit(3)
    .onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        const milliseconds = data.time.seconds * 1000 + data.time.nanoseconds / 1000000;
        return { id: doc.id, ...data, time: milliseconds };
      });
      dispatch({
        type: 'notifications/updateNotificationList',
        payload: [...docs],
      });
    });
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    data: [],
  },
  reducers: {
    updateNotificationList(state, action) {
      console.log('update was triggered with: ', action);
      state.data = action.payload;
    },
  },
  extraReducers: {},
});

export default notificationSlice.reducer;
