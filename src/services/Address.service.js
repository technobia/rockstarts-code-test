/**
 * Created by apium on 17/05/2017.
 */

import {
    FETCH_ADDRESS_SUCCESS,
    CREATE_ADDRESS_SUCCESS
} from '../Homepage.reducer';
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

export function createAddressSuccess() {
    return {
        type: CREATE_ADDRESS_SUCCESS,
        success: true
    };
}

export function fetchAddressList() {
    const address = firebase.database().ref('/addressList').once('value');
    return address.then(resp => fetchAddressListSuccess(makeAddressList(resp)));
}

export function createAddressRow(formData) {
    return writeAddressRow(formData, Guid())
        .then(createAddressSuccess);
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

function writeAddressRow(data, addressId) {
    return firebase.database().ref('addressList/' + addressId).set({
        streetName: data.streetName,
        ward: data.ward,
        district: data.district,
        city: data.city,
        country: data.country
    });
}

function Guid() {
    let s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
