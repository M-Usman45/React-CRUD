import React from 'react'
import jwtDecode from 'jwt-decode'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import DashboardRoutes from './dashboardRoutes'

const NavBar = () => {
	const onSignOut = () => {
		localStorage.removeItem('token')
		window.location = '/'
	}
	const token = localStorage.getItem('token')
	const jwt = jwtDecode(token)
	const UserName = jwt.name
	return (
		<React.Fragment>
			<Router>
				<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
					<span className="navbar-brand"> {UserName} </span>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#collapsibleNavbar"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
						<ul className="navbar-nav">
							<li className="nav-item ">
								<Link className="nav-link" to="/viewPosts">
									View All Posts
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/createProfile">
									Create Profile
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/createPost">
									Create New Post
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/googleMap">
									GoogleMap
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/calculator">
									Calculator
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/web-cam">
									Web Cam
								</Link>
							</li>
						</ul>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="/" onClick={onSignOut}>
									SignOut
								</Link>
							</li>
						</ul>
					</div>
				</nav>
				<DashboardRoutes />
			</Router>
		</React.Fragment>
	)
}

export default NavBar
