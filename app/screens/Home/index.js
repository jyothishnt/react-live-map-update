import React from 'react';
import {default as fetch} from "isomorphic-fetch";
require ('js-marker-clusterer');

const mapStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  minHeight: '100px',
};

const fancyMapStyles = [{
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
}];

// module state
let map = null;

export default React.createClass({

  displayName: 'GoogleMap',

  getInitialState() {
    return {
      markers: [],
      data: null,
      markerCluster: null
    };
  },

  componentDidMount() {
    this.createMap();
    this.createMarkers();
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUpdate() {
    window.setTimeout(() => {
      this.createMarkers();
    }, 2000);
  },

  clearMarkers() {
    this.markerCluster && this.markerCluster.removeMarkers(this.state.markers);
  },

  createMarkers() {
    fetch("http://www.pneumogen.net/dataviewer/json/get_live_data/5")
      .then(res => res.json())
      .then(data => {
        const subset = data.data;
        const markers = [];

        for (var i = 0; i < subset.length; i++) {
          var latLng = new google.maps.LatLng(subset[i].latitude,
              subset[i].longitude);
          var marker = new google.maps.Marker({'position': latLng});
          markers.push(marker);
        }

        this.clearMarkers();
        this.markerCluster = new MarkerClusterer(map, markers, {'minimumClusterSize': 1 });
        this.setState({ markers });
      });
  },

  createMap() {
    const center = new google.maps.LatLng(
      48.415146, 22.411837
    );

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center,
      streetViewControl: false,
      scaleControl: true,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      zoom: (window.innerWidth > 1280) ? 3 : 2,
      styles: fancyMapStyles,
   });
  },

  handleResize() {
    // map.set
  },

  render() {
    return (
      <div id="map-canvas" style={mapStyle}></div>
    );
  },

});
