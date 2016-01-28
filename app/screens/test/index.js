import {default as React, Component} from "react";
import {default as fetch} from "isomorphic-fetch";
import {default as MarkerClusterer} from "react-google-maps/lib/addons/MarkerClusterer";
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";
/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */

export default class StyledMap extends Component {
  /*
   * 1. Create a component that wraps all your map sub-components.
   */

  static fancyMapStyles = [{
    // The style is copy from https://snazzymaps.com/style/2/midnight-commander
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#ffffff"
    }]
  }, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#000000"
    }, {
      "lightness": 13
    }]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#000000"
    }]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#144b53"
    }, {
      "lightness": 10
    }, {
      "weight": 1.4
    }]
  }, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{
      "color": "#08304b"
    }]
  }, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#0c4152"
    }, {
      "lightness": 5
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#000000"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#0b434f"
    }, {
      "lightness": 25
    }]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#000000"
    }]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#0b3d51"
    }, {
      "lightness": 16
    }]
  }, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
      "color": "#000000"
    }]
  }, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
      "color": "#146474"
    }]
  }, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
      "color": "#021019"
    }]
  }]


  state = {
    markers: [],
  }

  // componentWillMount () {
  //   let markers = [];
  //   for (let i = 0; i < 5; i++) {
  //     const position = new google.maps.LatLng(48.415146, 22.411837 + (i * 2));
  //     markers.push({
  //       position,
  //       content: "This is the secret message",
  //       showInfo: false,
  //     });
  //   }

  //   this.setState({
  //     markers,
  //   });
  // }

  componentDidMount() {
    fetch("https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json")
      .then(res => res.json())
      .then(data => {
          this.setState({
            markers: data.photos.filter( x => { return Math.random() > 0.75; }),
          });
      });
  }

  handleMarkerClick() {

  }


  render () {
    /*
     * 2. Render GoogleMapLoader component with containerProps
     */
    const myLatLng = new google.maps.LatLng(48.415146, 22.411837)
    const {markers} = this.state;


    return (
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: "100%",
            }}

          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={myLatLng}
            defaultOptions={{
              styles: StyledMap.fancyMapStyles,
            }}
          >
          <MarkerClusterer
           averageCenter={ true }
           enableRetinaIcons={ true }
           gridSize={ 60 }>
           { markers.map(marker => (
             <Marker
               position={{ lat: marker.latitude, lng: marker.longitude }}
               key={ marker.photo_id }
             />
           )) }
          </MarkerClusterer>


          </GoogleMap>
        }
      />
    );
  }
}