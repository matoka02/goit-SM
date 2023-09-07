import { createSlice } from '@reduxjs/toolkit';

import message from 'helpers/Message';
import { ua, en } from 'localization';
import { registration, logIn, logOut, refresh, getUser, setDailyRate } from './userOperations';
import userInitialState from './productInitialState';

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    google: (state, action) => {
      state.userData = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    languageSelection: (state, action) => {
      switch (action.payload) {
        case 'ua':
          state.lang = ua;
          break;
        case 'en':
          state.lang = en;
          break;
        default:
          state.lang = en;
      }
    },
    extraReducers: {
      [registration.pending]: state => {
        state.isLoading = true;
      },
      [registration.fulfilled]: state => {
        state.isLoading = false;
        message.success('Registration was completed successfully');
      },
      [registration.rejected]: (state, action) => {
        state.isLoading = false;
        message.error('Registration error', `${action.payload.response.data.message}`, 'Ok');
      },

      [logIn.pending]: state => {
        state.isLoading = true;
      },
      [logIn.fulfilled]: (state, action) => {
        state.userData = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      },
      [logIn.rejected]: (state, action) => {
        state.isLoading = false;
        message.error('LogIn error', `${action.payload.response.data.message}`, 'Ok');
      },

      [logOut.pending]: state => {
        state.isLoading = true;
      },
      [logOut.fulfilled]: (state, action) => {
        state.userData = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      },
      [logOut.rejected]: (state, action) => {
        state.isLoading = false;
        message.error('LogOut error', `${action.payload.response.data.message}`, 'Ok');
      },

      [refresh.pending]: state => {
        state.isLoading = true;
      },
      [refresh.fulfilled]: (state, action) => {
        state.refreshToken = action.payload.refreshToken;
        state.isLoading = false;
      },
      [refresh.rejected]: (state, action) => {
        state.isLoading = false;
        console.error('refresh error: ', action.payload);
      },

      [getUser.pending]: state => {
        state.isLoading = true;
      },
      [getUser.fulfilled]: (state, action) => {
        state.userData = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
      },
      [getUser.rejected]: (state, action) => {
        state.isLoading = false;
        console.error('getUser error: ', action.payload);
      },

      [setDailyRate.fulfilled]: (state, action) => {
        state.userData.dailyRate = action.payload.dailyRate;
        state.userData.bloodGroup = action.payload.bloodGroup;
        message.success('Your data has been successfully updated');
      },
      [setDailyRate.rejected]: (state, action) => {
        console.error('refresh error: ', action.payload);
      },
    }
  }
});

export const { google, languageSelection } = userSlice.actions;

export default userSlice.reducer;