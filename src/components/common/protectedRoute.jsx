import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from "../../services/authService"

const ProtectedRoute = ({path, component: Component, render, ...rest}) => (
  <Route
    path={path}
    {...rest}
    render={props => (!getCurrentUser()
      ? <Redirect to = "/" /> : Component
      ? <Component {...props} user={getCurrentUser()} /> : render(props))}
    />
  );
  export default ProtectedRoute; 