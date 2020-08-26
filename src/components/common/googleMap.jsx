import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
class GoogleMap extends Component {
	render() {
		return (
			<div style={{ width: '100%', height: 'calc( 100vh - 70px)' }}>
				<GoogleMapReact defaultCenter={{ lat: 59.95, lng: 30.33 }} defaultZoom={10} />
			</div>
		)
	}
}

export default GoogleMap
