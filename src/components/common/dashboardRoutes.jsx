import React from 'react'
// import ViewPosts from '../posts/viewPosts'
import CreatePost from '../posts/createPost'
import CreateProfile from '../common/createProfile'
import ViewSinglePost from '../posts/viewSinglePost'
import ProtectedRoute from './protectedRoute'
import { Switch } from 'react-router-dom'
import GoogleMap from './googleMap'
import Calculator from './calculator'
import PostsDatatable from '../posts/postsDatatable'

const DashboardRoutes = () => {
	return (
		<Switch>
			<ProtectedRoute exact path="/viewPosts" component={PostsDatatable} />
			<ProtectedRoute path="/createProfile" component={CreateProfile} />
			<ProtectedRoute path="/createPost" component={CreatePost} />
			<ProtectedRoute path="/googleMap" component={GoogleMap} />
			<ProtectedRoute path="/calculator" component={Calculator} />
			<ProtectedRoute path="/viewPostDetails" render={(props) => <ViewSinglePost {...props} />} />
			{/* <Redirect to="/" /> */}
		</Switch>
	)
}

export default DashboardRoutes
