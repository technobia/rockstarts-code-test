/**
 * Created by apium on 19/05/2017.
 */
import React, {Component} from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const coords = {
    lat: 10.77597580635167,
    lng: 106.6494369506836
};

const params = {v: '3.exp', key: 'AIzaSyCYQMCqEZ8cd96y5wt7SPVRyJOCavVPW5Y', libraries: 'places'};

export default class GoogleMap extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            maker: {}
        }
    }

    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onDragEnd(e) {
        console.log('onDragEnd', e);
    }

    onMapClick(e) {
        const { latLng } = e;
        let lat = latLng.lat();
        let lng = latLng.lng();
        this.setState({marker: {lat, lng}}, () => console.log(lat, lng));
    }

    render() {
        let {marker} = this.state;
        return (
            <Gmaps
                width={'100%'}
                height={'400px'}
                lat={coords.lat}
                lng={coords.lng}
                zoom={12}
                loadingMessage={'Be happy'}
                params={params}
                onClick={::this.onMapClick}
                onMapCreated={::this.onMapCreated}>
                {!!marker ? <Marker
                        lat={marker.lat}
                        lng={marker.lng}
                        draggable={true}
                        onDragEnd={this.onDragEnd} /> : null}
            </Gmaps>
        );
    }
}