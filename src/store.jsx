import { configureStore } from '@reduxjs/toolkit';
import {citiesSlice} from './modules/cities/citiesSlice';

export default configureStore({
  reducer: {
    cities: citiesSlice.reducer
  }
})