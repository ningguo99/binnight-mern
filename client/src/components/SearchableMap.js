import React from 'react';
import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl';
import { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import { Image } from 'react-bootstrap';

const geolocateStyle = {
    float: 'left',
    margin: '50px',
    padding: '10px'
};

class SearchableMap extends React.Component {
    state = {
        viewport: {
            latitude: -37.874966,
            longitude: 145.044923,
            zoom: 13
        },
        searchResultLayer: null,
        selectedSchedule: null,
        searchedLocation: null,
        latitude: '',
        longitude: ''
    }

    // Create a map reference
    mapRef = React.createRef()

    handleViewportChange = viewport => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        })
    }

    // This will customise Geocoder settings. Or to use default settings, just pass handleViewportChange directly.
    handleGeocoderViewportChange = viewport => {
        const geocoderDefaultOverrides = { transitionDuration: 500 };

        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides
        });
    };

    // When the user search a location, initiate the searchResultLayer.
    handleOnResult = async event => {
        this.setState({
            searchResultLayer: new GeoJsonLayer({
                id: "search-result",
                data: event.result.geometry,
                getFillColor: [255, 0, 0, 128],
                getRadius: 1000,
                pointRadiusMinPixels: 10,
                pointRadiusMaxPixels: 10
            }),
            searchedLocation: event.result
        });
        this.setState({
            latitude: event.result.geometry.coordinates[1],
            longitude: event.result.geometry.coordinates[0]
        });
        this.props.onMapResult(this.state.latitude, this.state.longitude);
    }

    render() {
        const { viewport, searchedLocation } = this.state;
        let marker;
        // If the user has searched a location, then show a marker on the map
        if (searchedLocation !== null) {
            marker = (<Marker
                key={searchedLocation.id}
                latitude={searchedLocation.geometry.coordinates[1]}
                longitude={searchedLocation.geometry.coordinates[0]}>
                <Image
                    width="30"
                    height="30"
                    src="home_mark.png"
                    style={{ marginRight: 10 }} />
            </Marker>)
        }
        return (
            <div style={{ height: '60vh' }}>
                <ReactMapGL
                    ref={this.mapRef}
                    {...viewport}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    width="100%"
                    height="90%"
                    onViewportChange={this.handleGeocoderViewportChange}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                >
                    <Geocoder
                        mapRef={this.mapRef}
                        onResult={this.handleOnResult}
                        onViewportChange={this.handleGeocoderViewportChange}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        position='top-right'
                        countries='au'
                    />

                    {marker}

                    <GeolocateControl
                        style={geolocateStyle}
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                    />
                </ReactMapGL>
            </div>
        )
    }
}

export default SearchableMap;