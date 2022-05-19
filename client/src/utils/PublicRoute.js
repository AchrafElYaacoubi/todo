import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { getUsername } from '../store/user/selectors';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, ...rest }) => {
    const username = useSelector(getUsername);
    console.log("🚀 ~ file: PublicRoute.js ~ line 9 ~ PublicRoute ~ username", username)
    return (
      <Route
        {...rest}
        render={(props) =>
            !isEmpty(username) ? (
            <Redirect
              to={{
                pathname: '/dashboard',
                state: { from: props.location },
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  };
  
  export default PublicRoute;