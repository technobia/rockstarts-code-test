export const FETCH_ADDRESS_SUCCESS = 'FETCH_ADDRESS_SUCCESS';
export const CREATE_ADDRESS_SUCCESS = 'CREATE_ADDRESS_SUCCESS';
export const REMOVE_ADDRESS_SUCCESS = 'REMOVE_ADDRESS_SUCCESS';
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';

let initialState = {
    addressList: []
};

export default function Homepage(state = initialState, action)  {
    switch (action.type) {
        case FETCH_ADDRESS_SUCCESS:
            return {...state, addressList: action.addressList };
        case CREATE_ADDRESS_SUCCESS:
            return {...state};
        case FETCH_LOCATION_SUCCESS:
            return {...state, locationData: action.locationData};
    }

    return state;
};



