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
    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onDragEnd(e) {
        console.log('onDragEnd', e);
    }

    onCloseClick() {
        console.log('onCloseClick');
    }

    onClick(e) {
        console.log('onClick', e);
    }

    render() {
        return (
            <Gmaps
                width={'100%'}
                height={'400px'}
                lat={coords.lat}
                lng={coords.lng}
                zoom={12}
                loadingMessage={'Be happy'}
                params={params}
                onMapCreated={this.onMapCreated}>
                <Marker
                    lat={coords.lat}
                    lng={coords.lng}
                    draggable={true}
                    onDragEnd={this.onDragEnd} />
                <InfoWindow
                    lat={coords.lat}
                    lng={coords.lng}
                    content={'Hello, React :)'}
                    onCloseClick={this.onCloseClick} />
                <Circle
                    lat={coords.lat}
                    lng={coords.lng}
                    radius={500}
                    onClick={this.onClick} />
            </Gmaps>
        );
    }
}