import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, db } from '../../config/firebaseConfig';

const signIn = createAsyncThunk('auth/signIn', async ({ email, password }) => {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      if (user) {
        db.collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              return {
                type: 'auth/setSignedIn',
                payload: {
                  id: doc.id,
                  ...doc.data(),
                },
              };
            }
          });
      }
    })
    .catch((error) => {
      throw Error(error.message);
    });
});

const signOut = createAsyncThunk('auth/signOut', async () => {
  return auth
    .signOut()
    .then(() => console.log('sign out successful'))
    .catch((error) => {
      throw Error(error.message);
    });
});
const signUp = createAsyncThunk('auth/signUp', async ({ email, password, firstName, lastName }) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const now = Date.now();
      const user = {
        firstName,
        lastName,
        initials: firstName[0] + lastName[0],
        signedUp: now,
      };
      try {
        db.collection('users').doc(response.user.uid).set(user);

        return user;
      } catch (error) {
        throw Error(error.message);
      }
    })
    .catch((error) => {
      throw Error(error.message);
    });
});

const authListener = (dispatch, getState) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch({
              type: 'auth/setSignedIn',
              payload: {
                id: doc.id,
                profile: { ...doc.data() },
                displayName: user.displayName,
                email: user.email,
                emailIsVerified: user.emailVerified,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                userCreated: user.metadata.creationTime,
                userLastSignedIn: user.metadata.lastSignInTime,
              },
            });
          }
        });
    }
  });
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoaded: false,
    error: null,
    currentUser: null,
  },
  reducers: {
    setSignedIn(state, action) {
      state.isLoaded = true;
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [signIn.rejected]: (state, action) => {
      state.error = action.error;
    },
    [signIn.fulfilled]: (state, action) => {
      state.error = null;
      state.currentUser = action.payload;
    },
    [signOut.rejected]: (state, action) => {
      state.error = action.error;
    },
    [signOut.fulfilled]: (state) => {
      state.error = null;
      state.currentUser = null;
    },
    [signUp.rejected]: (state, action) => {
      state.error = action.error;
    },
    [signUp.fulfilled]: (state, action) => {
      state.error = null;
      state.currentUser = action.payload;
    },
  },
});

export { signIn, signOut, signUp }; // async thunks
export { authListener }; // listener connection with firebase
export const { setSignedIn } = authSlice.actions;

export default authSlice.reducer;
