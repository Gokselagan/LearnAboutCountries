import { createSlice } from '@reduxjs/toolkit';
import { Countries } from './Models';

interface CountriesAction {
  payload: Countries[];
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState : {
    countryList: [] as Countries[],
    selectedCountry: null as Countries | null,
  },
  reducers: {
    setCountries(state, action: CountriesAction) {
     state.countryList = [...action.payload];
    },
    updateCountry(state, action) {
      const updatedCountry =action.payload;
      state.countryList = state.countryList.map(country =>
        country.name.common === updatedCountry.name.common ? updatedCountry : country
      );
      state.selectedCountry = updatedCountry;
    },
  },
});

export const { setCountries, updateCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
