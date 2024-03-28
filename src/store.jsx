import { configureStore } from '@reduxjs/toolkit';
import {citiesSlice} from './modules/cities/citiesSlice';
import { userSlice } from './modules/user/userSlice';

export default configureStore({
  reducer: {
    cities: citiesSlice.reducer,
    user: userSlice.reducer
  }
})