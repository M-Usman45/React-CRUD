import React from 'react'
import ViewPosts from '../posts/viewPosts'
import CreatePost from '../posts/createPost'
import CreateProfile from '../common/createProfile'
import ViewSinglePost from '../posts/viewSinglePost'
import ProtectedRoute from './protectedRoute'
import { Switch, Redirect } from 'react-router-dom'
import GoogleMap from './googleMap'

const DashboardRoutes = () => {
	return (
		<Switch>
			<ProtectedRoute exact path="/viewPosts" component={ViewPosts} />
			<ProtectedRoute path="/createProfile" component={CreateProfile} />
			<ProtectedRoute path="/createPost" component={CreatePost} />
			<ProtectedRoute path="/googleMap" component={GoogleMap} />
			<ProtectedRoute path="/viewPostDetails" render={(props) => <ViewSinglePost {...props} />} />
			<Redirect to="/" />
		</Switch>
	)
}

export default DashboardRoutes
