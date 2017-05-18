/**
 * Created by apium on 17/05/2017.
 */

import {FETCH_ADDRESS_SUCCESS} from '../Homepage.reducer';
import * as _ from 'lodash';
import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyDVLayZJXrdU7ht7taArLocwXk6wxqSB-c",
    authDomain: "rockstarts-code-test.firebaseapp.com",
    databaseURL: "https://rockstarts-code-test.firebaseio.com",
    projectId: "rockstarts-code-test",
    storageBucket: "rockstarts-code-test.appspot.com",
    messagingSenderId: "342248828272"
});

export function fetchAddressListSuccess(addressList) {
    return {
        type: FETCH_ADDRESS_SUCCESS,
        addressList: addressList
    };
}

export function fetchAddressList() {
    const address = firebase.database().ref('/addressList').once('value');
    return address.then(resp => fetchAddressListSuccess(makeAddressList(resp)));
}

function makeAddressList(resp) {
    const result = [];
    _.chain(resp.val())
        .keys()
        .forEach(key => {
            result.push(resp.val()[key]);
        })
        .value();
    return result;
}

function writeUserData(streetName, ward, district, city, country, addressId) {
    firebase.database().ref('addressList/' + addressId).set({
        streetName: streetName,
        ward: ward,
        district: district,
        city: city,
        country: country
    });
}