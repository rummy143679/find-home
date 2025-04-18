import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './modules/loginStore';

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
