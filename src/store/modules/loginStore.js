import { createSlice } from '@reduxjs/toolkit';

const loginStore = createSlice({
  name: 'login',
  initialState: {
    loggedIn: JSON.parse(sessionStorage.getItem("isLoggedIn")) || false,
    service: null,
    userType: sessionStorage.getItem("userType") || ""
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.loggedIn = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.service = null;
    },
    setUserType: (state, action) => {
      state.userType = action.payload
    }
  },
});

export const { setLoginStatus, setService, logout, setUserType } = loginStore.actions;
export default loginStore.reducer;
