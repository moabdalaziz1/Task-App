import { createSlice } from '@reduxjs/toolkit';

const getMood = () => {
  const localMood = window.localStorage.getItem('mood');
  if (localMood) {
    return JSON.parse(localMood);
  }
  window.localStorage.setItem('mood', JSON.stringify(false));
  return false;
};

const initialState = {
  isDark: getMood(),
};

const darkLightSlice = createSlice({
  name: 'darkLightMood',
  initialState,
  reducers: {
    toggleSiteMood: (state, action) => {
      state.isDark = action.payload;
      window.localStorage.setItem('mood', JSON.stringify(state.isDark));
    },
  },
});

export default darkLightSlice.reducer;
export const { toggleSiteMood } = darkLightSlice.actions;
