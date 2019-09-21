import React from 'react';
import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl';
import { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import BinSchedule from '../apis/BinSchedule';
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
        searchedLocation: null
    }

    onAddressSelected = async (latitude, longitude) => {
        const currentDate = new Date().toISOString().slice(0, 10);

        const response = await BinSchedule.get(`/${latitude}/${longitude}/${currentDate}`);
        this.setState({ selectedSchedule: response });
    };




    mapRef = React.createRef()

    handleViewportChange = viewport => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        })
    }
    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    handleGeocoderViewportChange = viewport => {
        const geocoderDefaultOverrides = { transitionDuration: 500 };

        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides
        });
    };

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
            searchedLocation: event.result.geometry.coordinates
        });
        this.onAddressSelected(event.result.geometry.coordinates[1], event.result.geometry.coordinates[0]);
    }

    render() {
        const { viewport, searchResultLayer, searchedLocation, selectedSchedule } = this.state;
        let marker;
        let schedule;

        if (selectedSchedule !== null) {
            schedule = (
                <div>
                    Next rub:{selectedSchedule.data.rubNext}
                    Next rec:{selectedSchedule.data.recNext}
                    Next grn:{selectedSchedule.data.grnNext}
                </div>
            )
        }

        // If the user has searched a location, then show a marker on the map
        if (searchedLocation !== null) {
            marker = (<Marker
                latitude={searchedLocation[1]}
                longitude={searchedLocation[0]}>
                <Image
                    width="30"
                    height="30"
                    src="home_mark.png"
                    style={{ marginRight: 10 }} />
            </Marker>)
        }
        return (
            <div style={{ height: '50vh' }}>
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
                <div>{schedule}</div>
                {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}
            </div>
        )
    }


}


export default SearchableMap;