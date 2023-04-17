import {RootState} from '../index';

const getSignInError = (state: RootState) => state.auth.signInError;
const getSignInStatus = (state: RootState) => state.auth.signInStatus;

export const authSelectors = {
  getSignInError,
  getSignInStatus
};

