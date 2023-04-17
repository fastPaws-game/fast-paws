import {RootState} from '../index';

const getSignInError = (state: RootState) => state.auth.signInError;
const getSignInStatus = (state: RootState) => state.auth.signInStatus;
const getSignUpError = (state: RootState) => state.auth.signUpError;
const getSignUpStatus = (state: RootState) => state.auth.signUpStatus;

export const authSelectors = {
  getSignInError,
  getSignInStatus,
  getSignUpError,
  getSignUpStatus
};

