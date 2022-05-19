import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, SIGNUP_REQUEST } from './constants';
import { loginSuccess, loginFail, signupSuccess, signupFail } from './actions';
import { userLogin, userSignup } from './api';

export function* login({ payload }) {
  try {
    const { email, password, history } = payload;
    const response = yield call(userLogin, { email, password });
    const {
      token,
      user
    } = response.data;

    localStorage.setItem("token", `Bearer ${token}`);

    yield put(loginSuccess(user));
    yield call(history.push, '/Dashboard');
  } catch (error) {
    yield put(loginFail(error?.response?.data?.error || 'login error'));
  }
}
export function* watchUserLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

export function* signup({ payload }) {
    try {
      const { email, password, username, history } = payload;
      const response = yield call(userSignup, { email, password, username });
      const {
        token,
        user
      } = response.data;
  
      localStorage.setItem("token", `Bearer ${token}`);
  
      yield put(signupSuccess(user));
      yield call(history.push, '/Dashboard');
    } catch (error) {
      yield put(signupFail(error?.response?.data?.error || 'signup error'));
    }
  }
  export function* watchUserSignup() {
    yield takeLatest(SIGNUP_REQUEST, signup);
  }










