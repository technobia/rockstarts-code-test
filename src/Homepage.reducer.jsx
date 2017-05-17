export const CREATE_ADDRESS_SUCCESS = 'CREATE_ADDRESS_SUCCESS';

let initialState = {
    addressList: []
};

export default function Homepage(state = initialState, action)  {
    switch (action.type) {
        case CREATE_ADDRESS_SUCCESS:
            return {...state, addressList: action.addressList }
    }

    return state;
};



