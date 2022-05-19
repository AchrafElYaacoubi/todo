import { fromJS } from 'immutable';
import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOGOUT
} from './constants';

export const initialState = fromJS({
  token: '',
  email: '',
  username: '',
  isLoginLoading: false,
  isSignupLoading: false,
  errorMessage: '',
});

export default function reducer(state = initialState, action) {
  switch(action.type) {
    //login
    case LOGIN_REQUEST:
      return state.set('isLoginLoading', true).set('errorMessage', null);
    case LOGIN_SUCCESS:
      return state.merge(action.payload, { isLoginLoading: false });
    case LOGIN_FAIL:
      return state
        .set('isLoginLoading', false)
        .set('errorMessage', action.payload);
    //signup
    case SIGNUP_REQUEST:
      return state.set('isSubscriptionLoading', true).set('errorMessage', null);
    case SIGNUP_SUCCESS:
      return state.merge(action.payload, { isSubscriptionLoading: false });
    case SIGNUP_FAIL:
      return state
        .set('isSubscriptionLoading', false)
        .set('errorMessage', action.payload);
    case USER_LOGOUT:
        return state.merge(initialState);

    default:
      return state;
  }
}