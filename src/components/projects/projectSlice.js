import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../config/firebaseConfig';

export const createProject = createAsyncThunk(
  'project/createProject',
  async (project, { getState }) => {
    const { currentUser } = getState().auth;

    return db
      .collection('projects')
      .add({
        ...project,
        authorFirstName: currentUser.profile.firstName,
        authorLastName: currentUser.profile.lastName,
        authorId: currentUser.id,
        createdAt: Date.now(),
      })
      .then((response) => {})
      .catch((error) => {
        throw Error(error.message);
      });
  }
);

export const projectListener = (dispatch, getState) => {
  db.collection('projects')
    .orderBy('createdAt', 'desc')
    .limit(10)
    .onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      dispatch({
        type: 'project/updateProjectList',
        payload: [...docs],
      });
    });
};

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {
    updateProjectList(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [createProject.pending]: (state) => {
      state.loading = true;
    },
    [createProject.fulfilled]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [createProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default projectSlice.reducer;
