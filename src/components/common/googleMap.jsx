import React from "react"
import {GoogleMapReact}  from "google-map-react"
class GoogleMap extends Component {
  render() { 
    return ( 
      <div>
        <GoogleMapReact
          defaultCenter={{ lat: 59.95, lng: 30.33}}
          defaultZoom={10} />        
      </div>
     );
  }
}
 
export default GoogleMap;