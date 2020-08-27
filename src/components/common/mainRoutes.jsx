import React from 'react'
import SignUp from './signUp'
import SignIn from './signIn'
import Dashboard from './dashboard'
import { Route, Switch, Redirect } from 'react-router-dom'
import { getCurrentUser } from '../../services/authService'
const MainRoutes = () => {
	const islogin = getCurrentUser() ? true : false
	if (islogin) return <Dashboard />
	return (
		<Switch>
			<Route exact path="/" component={SignIn} />
			<Route path="/signUp" component={SignUp} />
			<Redirect to="/" />
		</Switch>
	)
}

export default MainRoutes
