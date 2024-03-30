import { configureStore } from '@reduxjs/toolkit';
import {countriesSlice} from './modules/Countries/countriesSlice';
import { userSlice } from './modules/user/userSlice';

export default configureStore({
  reducer: {
    countries: countriesSlice.reducer,
    user: userSlice.reducer
  }
})