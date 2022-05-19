import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isEmpty } from 'lodash';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
            isEmpty(localStorage.getItem('token')) ? (
            <Redirect
              to={{
                pathname: '/login',
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
  
  export default PrivateRoute;