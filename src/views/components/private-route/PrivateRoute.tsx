import RouteEnum from 'constants/RouteEnum';
import React, { Component, useEffect } from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import * as UserActions from 'stores/users/UserActions';

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

export const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userLogin'));
    if (user != null) {
      const decode = JSON.parse(atob(user.token.split('.')[1]));
      if (decode.exp * 1000 < Date.now()) {
        dispatch(UserActions.postLogout());
      }
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('userLogin') ? <Component {...props} /> : <Redirect to={{ pathname: RouteEnum.Home, state: { from: props.location } }} />
      }
    />
  );
};
