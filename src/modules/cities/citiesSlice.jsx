
import { createSlice } from '@reduxjs/toolkit';



export const citiesSlice = createSlice({
  name: 'cities',
  initialState : {
    cityList: [],
    selectedCity: null,
  },
  reducers: {
    setCities(state, action) {

     state.cityList = [...action.payload];
      
    },
    updateCity(state, action) {
      const updatedCity = action.payload;
      state.cityList = state.cityList.map(city =>
        city.name.common === updatedCity.name.common ? updatedCity : city
      );
      state.selectedCity = updatedCity;
    },

  },
});

export const { setCities, updateCity } = citiesSlice.actions;


export default citiesSlice.reducer;
