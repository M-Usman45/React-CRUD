import React from 'react'
import SignUp from './signUp'
import SignIn from './signIn'
import Dashboard from './dashboard'
import ProtectedRoute from './protectedRoute'
import { Route, Switch, Redirect } from 'react-router-dom'
const MainRoutes = () => {
	return (
		<Switch>
			<Route exact path="/" component={SignIn} />
			<Route path="/signUp" component={SignUp} />
			<ProtectedRoute path="/dashboard" component={Dashboard} />
			<Redirect to="/" />
		</Switch>
	)
}

export default MainRoutes
