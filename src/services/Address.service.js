/**
 * Created by apium on 17/05/2017.
 */

import {
    FETCH_ADDRESS_SUCCESS,
    CREATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_SUCCESS,
    REMOVE_ADDRESS_SUCCESS
} from '../Homepage.reducer';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import 'whatwg-fetch';
import json2csv from 'json2csv';

firebase.initializeApp({
    apiKey: 'AIzaSyDVLayZJXrdU7ht7taArLocwXk6wxqSB-c',
    authDomain: 'rockstarts-code-test.firebaseapp.com',
    databaseURL: 'https://rockstarts-code-test.firebaseio.com',
    projectId: 'rockstarts-code-test',
    storageBucket: 'rockstarts-code-test.appspot.com',
    messagingSenderId: '342248828272'
});

export function fetchAddressList() {
    const address = firebase.database().ref('/addressList').once('value');
    return address.then(resp => fetchAddressListSuccess(makeAddressList(resp)));
}

export function createAddressRow(formData) {
    return writeAddress(formData, Guid())
        .then(createAddressSuccess);
}

export function removeAddressRow(addressId) {
    return removeAddress(addressId)
        .then(removeAddressSuccess);
}

export function updateAddressRow(data) {
    let addressId = data.id || '';
    return writeAddress(data, addressId)
        .then(updateAddressSuccess);
}

export function fetchAddressListJson() {
    return fetch('https://rockstarts-code-test.firebaseio.com/addressList.json')
        .then(resp => resp.json())
        .then(data => json2csv({data}, (err, csv) => {
            if (err) console.log(err);
            generateDownloadCSV(csv);
        }));
}

const generateDownloadCSV = (csvString) => {
    let blob = new Blob([csvString]);
    if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        window.navigator.msSaveBlob(blob, 'addressList.csv');
    else
    {
        let a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(blob, {type: 'text/plain'});
        a.download = 'addressList.csv';
        document.body.appendChild(a);
        a.click();  // IE: 'Access is denied'; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        document.body.removeChild(a);
    }
};

const fetchAddressListSuccess = (addressList) => {
    return {
        type: FETCH_ADDRESS_SUCCESS,
        addressList: addressList
    };
};

const createAddressSuccess = () => {
    return {
        type: CREATE_ADDRESS_SUCCESS,
        success: true
    };
};

const updateAddressSuccess = () => {
    return {
        type: UPDATE_ADDRESS_SUCCESS,
        success: true
    };
};

const removeAddressSuccess = () => {
    return {
        type: REMOVE_ADDRESS_SUCCESS,
        success: true
    };
};


const makeAddressList = (resp) => {
    const result = [];
    _.chain(resp.val())
        .keys()
        .forEach(key => {
            result.push(resp.val()[key]);
        })
        .value();
    return result;
};

const writeAddress = (data, addressId) => {
    return firebase.database().ref('addressList/' + addressId).set({
        streetName: data.streetName,
        ward: data.ward,
        district: data.district,
        city: data.city,
        country: data.country,
        id: addressId
    });
};

const removeAddress = (addressId) => {
    return firebase.database().ref('addressList/' + addressId).remove();
};

const Guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
