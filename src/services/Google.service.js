/**
 * Created by apium on 19/05/2017.
 */
import 'whatwg-fetch';
import config from '../config';
import {FETCH_LOCATION_SUCCESS} from '../Homepage.reducer';

function fetchLocationSuccess(data) {
    return {
        type: FETCH_LOCATION_SUCCESS,
        data: data.results
    };
}

export function fetchLocationFromLatLng(data) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.lat +
        ',' + data.lng +
        '&key=' + config.GOOGLE_API_KEY;
    return fetch(url)
        .then(resp => resp.json())
        .then(resp => fetchLocationSuccess(resp));
}