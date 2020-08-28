import React from 'react'
import NavBar from './navBar'
import {ToastContainer} from "react-toastify"
const Dashboard = () => {
	return (
		<React.Fragment>
				<ToastContainer
					position="top-right"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					pauseOnFocusLoss
					pauseOnHover
				/>
			<NavBar />
		</React.Fragment>
	)
}

export default Dashboard
