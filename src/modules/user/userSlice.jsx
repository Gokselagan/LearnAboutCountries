import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isSignedIn: false,
    registeredUser: [],
    newUser: [],
  },
  reducers: {
    updateUser(state, action) {
      state.registeredUser = action.payload;
    },

    registerUser(state, action) {
      state.newUser = action.payload;
    },

    toggleSignIn(state) {
      state.isSignedIn = !state.isSignedIn;
    }
  },
});

export const { toggleSignIn, updateUser, registerUser } = userSlice.actions;


export default userSlice.reducer;
