import { en } from 'localization';

const authInitialState = {
  isLoading: true,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  userData: null,
  lang: en,
};

export default authInitialState;