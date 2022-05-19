import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOGOUT
} from './constants';


const requestLogin = payload => ({
  type: LOGIN_REQUEST,
  payload,
});
const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
const loginFail = error => ({
  type: LOGIN_FAIL,
  payload: error,
});

const requestSignup = payload => ({
  type: SIGNUP_REQUEST,
  payload,
})
const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});
const signupFail = error => ({
  type: SIGNUP_FAIL,
  payload: error,
});
const userLogout = () => ({
    type: USER_LOGOUT
})

export {
  requestLogin,
  loginSuccess,
  loginFail,
  requestSignup,
  signupSuccess,
  signupFail,
  userLogout
}