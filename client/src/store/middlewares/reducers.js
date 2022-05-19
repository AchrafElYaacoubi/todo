import { combineReducers } from 'redux-immutable';
import UserReducer from '../user/reducer';

//inject app reducers
const appReducers = () => 
  combineReducers({
    user: UserReducer,
  })

  export default appReducers;