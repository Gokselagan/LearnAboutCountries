import { createSlice } from '@reduxjs/toolkit';

export const countriesSlice = createSlice({
  name: 'countries',
  initialState : {
    countryList: [],
    selectedCountry: null,
  },
  reducers: {
    setCountries(state, action) {

     state.countryList = [...action.payload];
      
    },
    updateCountry(state, action) {
      const updatedCountry = action.payload;
      state.countryList = state.countryList.map(country =>
        country.name.common === updatedCountry.name.common ? updatedCountry : country
      );
      state.selectedCountry = updatedCountry;
    },

  },
});
export const { setCountries, updateCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
